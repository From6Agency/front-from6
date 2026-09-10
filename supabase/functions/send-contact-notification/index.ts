// Notifie franck.berthelot@from6agency.com a chaque soumission de formulaire
// (contact, diagnostic, proposer-un-projet). Recree apres la suppression du
// projet Supabase d'origine (voir supabase/migrations/20260909000000_*).
// Secret requis (Supabase → Edge Functions → Secrets) : RESEND_API_KEY.

const NOTIFY_TO = "franck.berthelot@from6agency.com";
const FROM_ADDRESS = "From 6 <franck.berthelot@from6agency.com>";

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
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: NotificationPayload = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY is not configured");

    const lines = [
      `Nom : ${payload.name}`,
      `Email : ${payload.email}`,
      payload.company ? `Entreprise : ${payload.company}` : null,
      payload.documentUrl ? `Piece jointe : ${payload.documentUrl}` : null,
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
        subject: `Nouvelle demande de ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend error ${res.status}: ${body}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
