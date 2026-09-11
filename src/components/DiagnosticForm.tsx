"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { makeReference } from "@/lib/reference";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookCallButton } from "@/components/BookCallButton";
import {
  FormCard,
  StepRail,
  StepPane,
  Field,
  ChoiceGroup,
  FormAlert,
  CaptchaBlock,
  PrimaryButton,
  BackButton,
  SuccessCard,
  useScrollToCard,
  inputClass,
  textareaClass,
} from "@/components/form/FormKit";

const NEEDS = [
  { value: "cpq_revenue_cloud", en: "CPQ and Revenue Cloud", fr: "CPQ et Revenue Cloud", hint_en: "Catalog, pricing rules, quotes, contracts", hint_fr: "Catalogue, règles de prix, devis, contrats" },
  { value: "billing", en: "Billing and subscriptions", fr: "Facturation et abonnements", hint_en: "Invoicing, renewals, revenue recognition", hint_fr: "Facturation, renouvellements, reconnaissance du revenu" },
  { value: "integrations", en: "Salesforce, ERP and integrations", fr: "Salesforce, ERP et intégrations", hint_en: "Flows between CRM, ERP, billing and data", hint_fr: "Flux entre CRM, ERP, facturation et data" },
  { value: "data_ai", en: "Data and AI", fr: "Data et IA", hint_en: "Data quality, automation, AI use cases", hint_fr: "Qualité des données, automatisations, cas d'usage IA" },
  { value: "other", en: "Another issue", fr: "Autre enjeu", hint_en: "Describe it in the next step", hint_fr: "Décrivez-le à l'étape suivante" },
] as const;

const TIMELINES = [
  { value: "asap", en: "As soon as possible", fr: "Dès que possible" },
  { value: "3_months", en: "Within 3 months", fr: "Dans les 3 mois" },
  { value: "later", en: "More than 3 months", fr: "Plus de 3 mois" },
  { value: "exploring", en: "Just exploring", fr: "Je me renseigne" },
] as const;

type Need = (typeof NEEDS)[number]["value"];
type Timeline = (typeof TIMELINES)[number]["value"];

const ORIENTATION: Record<Need, { en: string; fr: string }> = {
  cpq_revenue_cloud: {
    en: "This usually starts with a CPQ or Revenue Cloud framing session with Darix: catalog, pricing rules, contract cycle.",
    fr: "Cela démarre en général par une session de cadrage CPQ ou Revenue Cloud avec Darix : catalogue, règles de prix, cycle contractuel.",
  },
  billing: {
    en: "This usually starts with reconciling your CRM and billing data with Darix: who owns each field, which events sync.",
    fr: "Cela démarre en général par une réconciliation des données CRM et facturation avec Darix : qui porte chaque champ, quels événements se synchronisent.",
  },
  integrations: {
    en: "This usually starts with a platform audit of your Salesforce, ERP and integrations.",
    fr: "Cela démarre en général par un audit plateforme de votre Salesforce, de votre ERP et de vos intégrations.",
  },
  data_ai: {
    en: "This usually starts with a review of your data quality and of where AI can realistically help.",
    fr: "Cela démarre en général par une revue de la qualité de vos données et des endroits où l'IA peut réellement aider.",
  },
  other: {
    en: "Your description is read by Franck and routed to the right conversation.",
    fr: "Votre description est lue par Franck et orientée vers le bon échange.",
  },
};

// Le paramètre ?need= déposé par les guides présélectionne le sujet.
const NEED_PARAM_MAP: Record<string, Need> = {
  audit: "billing",
  cpq: "cpq_revenue_cloud",
  integration: "integrations",
};

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(100),
});

export function DiagnosticForm() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const searchParams = useSearchParams();
  const preselected = NEED_PARAM_MAP[searchParams.get("need") ?? ""] ?? "";

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [need, setNeed] = useState<Need | "">(preselected);
  const [description, setDescription] = useState("");
  const [tools, setTools] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState<Timeline | "">("");
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);

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
  const required = isEn ? "Required." : "Obligatoire.";
  const stepTitles = isEn
    ? ["What is the need?", "Your context", "Orientation and contact details"]
    : ["Quel est le besoin ?", "Votre contexte", "Orientation et coordonnées"];
  const { ref: cardRef, reveal } = useScrollToCard();

  const clearError = (key: string) => setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  const updateContact = (key: "name" | "email" | "company", value: string) => {
    setContact((c) => ({ ...c, [key]: value }));
    clearError(key);
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setErrors({});
    setStep(next);
    reveal();
  };

  const goNext = () => {
    if (step === 1 && !need) {
      setErrors({ need: isEn ? "Pick a need to continue." : "Choisissez un besoin pour continuer." });
      return;
    }
    if (step === 2 && !description.trim()) {
      setErrors({ description: isEn ? "A few lines on the problem are enough to continue." : "Quelques lignes sur le problème suffisent pour continuer." });
      return;
    }
    goTo(step + 1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limited) return;

    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        fieldErrors[key] = key === "email" ? (isEn ? "Enter a valid email address." : "Entrez une adresse email valide.") : required;
      }
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
      const ref = makeReference();
      const needLabel = NEEDS.find((n) => n.value === need);
      const timelineLabel = TIMELINES.find((t) => t.value === timeline);
      const message = [
        `Réf. ${ref}`,
        `[Diagnostic Darix]`,
        `Besoin : ${needLabel?.fr ?? need}`,
        `Description : ${description.trim()}`,
        tools.trim() && `Outils actuels : ${tools.trim()}`,
        budget.trim() && `Budget indicatif : ${budget.trim()}`,
        timelineLabel && `Calendrier : ${timelineLabel.fr}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        message,
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-contact-notification", {
          body: { name: parsed.data.name, email: parsed.data.email, company: parsed.data.company, message },
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
      <SuccessCard title={isEn ? "Your request is recorded." : "Votre demande est enregistrée."} reference={reference} isEn={isEn}>
        <p>
          {isEn
            ? "Franck reads every diagnostic himself. Pick a 30-minute slot now, or wait for his first reading by email."
            : "Franck lit chaque diagnostic lui-même. Choisissez un créneau de 30 minutes dès maintenant, ou attendez sa première lecture par email."}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <BookCallButton size="lg">{isEn ? "Pick a 30-minute slot" : "Choisir un créneau de 30 minutes"}</BookCallButton>
          <a href="/darix" className="text-sm font-medium text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
            {isEn ? "How From 6 and Darix work together" : "Comment From 6 et Darix travaillent ensemble"}
          </a>
        </div>
      </SuccessCard>
    );
  }

  const needOptions = NEEDS.map((n) => ({ value: n.value, label: isEn ? n.en : n.fr, description: isEn ? n.hint_en : n.hint_fr }));
  const timelineOptions = TIMELINES.map((t) => ({ value: t.value, label: isEn ? t.en : t.fr }));

  return (
    <FormCard ref={cardRef}>
      <StepRail step={step} total={3} title={stepTitles[step - 1]} isEn={isEn} />

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
            ? "The request could not be recorded. Your answers are kept: try again, or write to franck.berthelot@from6agency.com."
            : "La demande n'a pas pu être enregistrée. Vos réponses sont conservées : réessayez, ou écrivez à franck.berthelot@from6agency.com."}
        </FormAlert>
      )}

      <StepPane step={step} direction={direction}>
        {step === 1 && (
          <ChoiceGroup
            legend={isEn ? "Pick the closest subject" : "Choisissez le sujet le plus proche"}
            name="need"
            value={need}
            onChange={(v) => {
              setNeed(v);
              clearError("need");
            }}
            options={needOptions}
            error={errors.need}
          />
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field id="diag-description" label={isEn ? "Describe the problem" : "Décrivez le problème"} error={errors.description}>
              <textarea
                id="diag-description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  clearError("description");
                }}
                placeholder={isEn ? "What blocks your teams today, and since when" : "Ce qui bloque vos équipes aujourd'hui, et depuis quand"}
                className={textareaClass}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? "diag-description-error" : undefined}
                autoFocus
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="diag-tools" label={isEn ? "Current tools" : "Outils actuels"} optionalLabel={isEn ? "optional" : "facultatif"}>
                <input id="diag-tools" value={tools} onChange={(e) => setTools(e.target.value)} placeholder="Salesforce, NetSuite, Chargebee" className={inputClass} />
              </Field>
              <Field id="diag-budget" label={isEn ? "Budget" : "Budget"} optionalLabel={isEn ? "optional" : "facultatif"}>
                <input id="diag-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder={isEn ? "Range or envelope" : "Fourchette ou enveloppe"} className={inputClass} />
              </Field>
            </div>
            <ChoiceGroup legend={isEn ? "Timeline" : "Calendrier"} name="timeline" value={timeline} onChange={setTimeline} options={timelineOptions} columns={2} />
          </div>
        )}

        {step === 3 && (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            {need && (
              <p className="bg-muted/60 p-4 text-sm leading-relaxed">
                <span className="font-medium">{isEn ? "First reading: " : "Première lecture : "}</span>
                {isEn ? ORIENTATION[need].en : ORIENTATION[need].fr}
              </p>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="diag-name" label={isEn ? "Name" : "Nom"} error={errors.name}>
                <input
                  id="diag-name"
                  value={contact.name}
                  onChange={(e) => updateContact("name", e.target.value)}
                  disabled={limited}
                  className={inputClass}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "diag-name-error" : undefined}
                  autoFocus
                />
              </Field>
              <Field id="diag-email" label="Email" error={errors.email}>
                <input
                  id="diag-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                  disabled={limited}
                  className={inputClass}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "diag-email-error" : undefined}
                />
              </Field>
            </div>
            <Field id="diag-company" label={isEn ? "Company" : "Entreprise"} error={errors.company}>
              <input
                id="diag-company"
                value={contact.company}
                onChange={(e) => updateContact("company", e.target.value)}
                disabled={limited}
                className={inputClass}
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "diag-company-error" : undefined}
              />
            </Field>

            {showCaptcha && !limited && (
              <CaptchaBlock id="diag-captcha" num1={captcha.num1} num2={captcha.num2} answer={captcha.answer} onChange={setCaptchaAnswer} invalid={captcha.isValid === false} isEn={isEn} />
            )}

            <p className="text-xs leading-relaxed text-muted-foreground">
              {isEn ? "Your details are used only to answer this request. " : "Vos coordonnées servent uniquement à répondre à cette demande. "}
              <a href="/privacy-policy" className="text-signal underline underline-offset-2 transition-colors hover:text-foreground">
                {isEn ? "Privacy policy" : "Politique de confidentialité"}
              </a>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <BackButton onClick={() => goTo(2)}>{isEn ? "Back" : "Retour"}</BackButton>
              <PrimaryButton type="submit" disabled={limited} loading={status === "submitting"} loadingLabel={isEn ? "Recording" : "Enregistrement"}>
                {isEn ? "Send my request" : "Envoyer ma demande"}
              </PrimaryButton>
            </div>
          </form>
        )}
      </StepPane>

      {step < 3 && (
        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 1 ? <BackButton onClick={() => goTo(step - 1)}>{isEn ? "Back" : "Retour"}</BackButton> : <span />}
          <PrimaryButton onClick={goNext}>{isEn ? "Continue" : "Continuer"}</PrimaryButton>
        </div>
      )}
    </FormCard>
  );
}
