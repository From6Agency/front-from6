// Notifie franck.berthelot@from6agency.com a chaque soumission de formulaire
// (contact, diagnostic, proposer-un-projet). Recree apres la suppression du
// projet Supabase d'origine (voir supabase/migrations/20260909000000_*).
// Secret requis (Supabase → Edge Functions → Secrets) : RESEND_API_KEY.
// SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournis par la plateforme.
//
// Quand un document a ete depose dans le bucket prive `pitch-decks`, il est
// joint a l'email : Resend le telecharge lui-meme via un lien signe, et le
// meme lien (valable 7 jours) figure dans le corps du message en secours.

import { createClient } from "npm:@supabase/supabase-js@2";

const NOTIFY_TO = "franck.berthelot@from6agency.com";
// Adresse distincte de la boite de reception : un message "de soi a soi" qui
// ne passe pas par Google est traite comme une usurpation par Gmail.
const FROM_ADDRESS = "Site From 6 Agency <site@from6agency.com>";
const BUCKET = "pitch-decks";
const LINK_TTL_SECONDS = 60 * 60 * 24 * 7;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  documentUrl?: string;
  documentName?: string;
}

function safeFilename(name: string | undefined, path: string) {
  const fallback = path.split("/").pop() ?? "document";
  const candidate = (name ?? fallback).replace(/[\\/:*?"<>|]+/g, "-").trim();
  return candidate.length > 0 ? candidate.slice(0, 120) : fallback;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: NotificationPayload = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY is not configured");

    const attachments: Array<{ filename: string; path: string }> = [];
    let attachmentLine: string | null = null;

    if (payload.documentUrl) {
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
      const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(payload.documentUrl, LINK_TTL_SECONDS);
      const filename = safeFilename(payload.documentName, payload.documentUrl);
      if (!error && data?.signedUrl) {
        attachments.push({ filename, path: data.signedUrl });
        attachmentLine = `Pièce jointe : ${filename} (lien de secours, valable 7 jours : ${data.signedUrl})`;
      } else {
        attachmentLine = `Pièce jointe : ${filename} (fichier ${payload.documentUrl} dans le bucket ${BUCKET}, lien indisponible : ${error?.message ?? "erreur inconnue"})`;
      }
    }

    const lines = [
      `Nom : ${payload.name}`,
      `Email : ${payload.email}`,
      payload.company ? `Entreprise : ${payload.company}` : null,
      attachmentLine,
      "",
      payload.message,
    ].filter((l): l is string => l !== null);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFY_TO],
        reply_to: payload.email,
        subject: `Nouvelle demande de ${payload.name}${payload.company ? ` (${payload.company})` : ""}${attachments.length ? " [PJ]" : ""}`,
        text: lines.join("\n"),
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend error ${res.status}: ${body}`);
    }

    return new Response(JSON.stringify({ ok: true, attached: attachments.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
