"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Upload, AlertTriangle, Calculator } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1).max(2000),
});

export function ContactForm() {
  const { language } = useLanguage();
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const { captcha, generateCaptcha, validateCaptcha, setCaptchaAnswer, shouldShowCaptcha, incrementSubmissionCount, isRateLimited } =
    useCaptcha();

  useEffect(() => {
    if (shouldShowCaptcha()) {
      setShowCaptcha(true);
      generateCaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const limited = isRateLimited();
  const isEn = language === "en";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limited) return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    if (showCaptcha && !validateCaptcha()) {
      generateCaptcha();
      return;
    }

    setStatus("submitting");
    try {
      let documentUrl: string | null = null;
      if (file) {
        if (file.size > 10 * 1024 * 1024) throw new Error("file-too-large");
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("pitch-decks").upload(fileName, file);
        if (uploadError) throw uploadError;
        documentUrl = uploadData.path;
      }

      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        message: parsed.data.message,
        document_url: documentUrl,
      });
      if (error) throw error;

      await supabase.functions.invoke("send-contact-notification", {
        body: { ...parsed.data, documentUrl: documentUrl || undefined },
      });

      incrementSubmissionCount();
      setStatus("sent");
      setValues({ name: "", email: "", company: "", message: "" });
      setFile(null);
      setShowCaptcha(true);
      generateCaptcha();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-8 card-shadow">
      {limited && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {isEn
            ? "You've reached the maximum number of submissions for today. Please try again in 24 hours."
            : "Vous avez atteint le nombre maximum de soumissions pour aujourd'hui. Réessayez dans 24 heures."}
        </div>
      )}

      {status === "sent" && (
        <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4 text-sm">
          {isEn ? "Thank you for reaching out. I'll get back to you soon." : "Merci de m'avoir contacté. Je vous répondrai bientôt."}
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {isEn ? "Failed to send message. Please try again." : "Échec de l'envoi du message. Veuillez réessayer."}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Name" : "Nom"} *</label>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              disabled={limited}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email *</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              disabled={limited}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">{isEn ? "Company" : "Entreprise"}</label>
          <input
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            disabled={limited}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">{isEn ? "Message" : "Message"} *</label>
          <textarea
            rows={5}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            disabled={limited}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {isEn ? "Attach Document (Optional)" : "Joindre un document (Optionnel)"}
          </label>
          <label
            htmlFor="file-upload"
            className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground hover:border-muted-foreground/50 ${limited ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            <Upload className="h-4 w-4" />
            {file ? file.name : isEn ? "Click to upload PDF, PPT, or DOC (max 10MB)" : "Cliquez pour téléverser PDF, PPT ou DOC (max 10 Mo)"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={limited}
            className="hidden"
          />
        </div>

        {showCaptcha && !limited && (
          <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              {isEn ? "Spam Protection" : "Protection anti-spam"}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg">
                {captcha.num1} + {captcha.num2} =
              </span>
              <input
                type="number"
                value={captcha.answer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-20 rounded-lg border border-border bg-background px-2 py-1"
              />
              {captcha.isValid === false && <span className="text-sm text-destructive">{isEn ? "Incorrect" : "Incorrect"}</span>}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting" || limited}
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {status === "submitting" ? (isEn ? "Sending..." : "Envoi...") : isEn ? "Send Message" : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}
