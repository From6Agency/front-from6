"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { makeReference } from "@/lib/reference";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FormCard, Field, ChoiceGroup, FileDrop, FormAlert, CaptchaBlock, PrimaryButton, SuccessCard, inputClass, textareaClass } from "@/components/form/FormKit";

const SUBJECTS = [
  { value: "media", en: "Podcast or talk", fr: "Podcast ou intervention" },
  { value: "partnership", en: "Partnership", fr: "Partenariat" },
  { value: "other", en: "Another request", fr: "Autre demande" },
] as const;

type Subject = (typeof SUBJECTS)[number]["value"];

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1).max(2000),
});

export function ContactForm() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [subject, setSubject] = useState<Subject>("other");
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
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

  const update = (key: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limited) return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        fieldErrors[key] = key === "email" ? (isEn ? "Enter a valid email address." : "Entrez une adresse email valide.") : isEn ? "Required." : "Obligatoire.";
      }
      setErrors(fieldErrors);
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setErrors({ file: isEn ? "The file exceeds 10 MB." : "Le fichier dépasse 10 Mo." });
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
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("pitch-decks").upload(fileName, file);
        if (uploadError) throw uploadError;
        documentUrl = uploadData.path;
      }

      const ref = makeReference();
      const subjectLabel = SUBJECTS.find((s) => s.value === subject);
      const message = [`Réf. ${ref}`, `[Contact] Sujet : ${subjectLabel?.fr ?? subject}`, "", parsed.data.message].join("\n");

      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        message,
        document_url: documentUrl,
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-contact-notification", {
          body: {
            name: parsed.data.name,
            email: parsed.data.email,
            company: parsed.data.company,
            message,
            documentUrl: documentUrl || undefined,
            documentName: file?.name,
          },
        })
        .catch(() => {});

      incrementSubmissionCount();
      setReference(ref);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" && reference) {
    return (
      <SuccessCard title={isEn ? "Your message is recorded." : "Votre message est enregistré."} reference={reference} isEn={isEn}>
        <p>
          {isEn
            ? "A notification has left for Franck. He answers himself, in the order requests arrive."
            : "Une notification est partie vers Franck. Il répond lui-même, dans l'ordre d'arrivée des demandes."}
        </p>
      </SuccessCard>
    );
  }

  const subjectOptions = SUBJECTS.map((s) => ({ value: s.value, label: isEn ? s.en : s.fr }));

  return (
    <FormCard>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        {limited && (
          <FormAlert>
            {isEn
              ? "You have reached the maximum number of submissions for today. Please try again in 24 hours."
              : "Vous avez atteint le nombre maximum d'envois pour aujourd'hui. Réessayez dans 24 heures."}
          </FormAlert>
        )}
        {status === "error" && (
          <FormAlert>
            {isEn
              ? "The message could not be sent. Your text is kept: try again, or write to franck.berthelot@from6agency.com."
              : "Le message n'a pas pu être envoyé. Votre texte est conservé : réessayez, ou écrivez à franck.berthelot@from6agency.com."}
          </FormAlert>
        )}

        <ChoiceGroup legend={isEn ? "Subject" : "Sujet"} name="subject" value={subject} onChange={setSubject} options={subjectOptions} columns={2} disabled={limited} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="contact-name" label={isEn ? "Name" : "Nom"} error={errors.name}>
            <input
              id="contact-name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={limited}
              className={inputClass}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
          </Field>
          <Field id="contact-email" label="Email" error={errors.email}>
            <input
              id="contact-email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={limited}
              className={inputClass}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
          </Field>
        </div>

        <Field id="contact-company" label={isEn ? "Company" : "Entreprise"} optionalLabel={isEn ? "optional" : "facultatif"}>
          <input id="contact-company" value={values.company} onChange={(e) => update("company", e.target.value)} disabled={limited} className={inputClass} autoComplete="organization" />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={limited}
            className={textareaClass}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
        </Field>

        <FileDrop
          id="contact-file"
          file={file}
          onChange={(f) => {
            setFile(f);
            setErrors((e) => ({ ...e, file: "" }));
          }}
          label={isEn ? "Attach a document" : "Joindre un document"}
          hint={isEn ? "Optional: PDF, PPT or DOC, 10 MB max" : "Facultatif : PDF, PPT ou DOC, 10 Mo max"}
          disabled={limited}
        />
        {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}

        {showCaptcha && !limited && (
          <CaptchaBlock id="contact-captcha" num1={captcha.num1} num2={captcha.num2} answer={captcha.answer} onChange={setCaptchaAnswer} invalid={captcha.isValid === false} isEn={isEn} />
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          {isEn ? "Your details are used only to answer this request. " : "Vos coordonnées servent uniquement à répondre à cette demande. "}
          <a href="/privacy-policy" className="text-signal underline underline-offset-2 transition-colors hover:text-foreground">
            {isEn ? "Privacy policy" : "Politique de confidentialité"}
          </a>
        </p>

        <div className="pt-1">
          <PrimaryButton type="submit" disabled={limited} loading={status === "submitting"} loadingLabel={isEn ? "Recording" : "Enregistrement"}>
            {isEn ? "Send my message" : "Envoyer mon message"}
          </PrimaryButton>
        </div>
      </form>
    </FormCard>
  );
}
