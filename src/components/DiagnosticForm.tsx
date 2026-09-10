"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { AlertTriangle, Calculator, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookCallButton } from "@/components/BookCallButton";

// Correspondance avec le paramètre ?need= déposé par les pages /ressources,
// pour présélectionner le sujet à l'étape 1 au lieu de partir d'un choix vide.
const NEED_PARAM_MAP: Record<string, (typeof NEEDS)[number]["value"]> = {
  audit: "billing",
  cpq: "cpq_revenue_cloud",
  integration: "integrations",
};

const NEEDS = [
  { value: "cpq_revenue_cloud", en: "CPQ & Revenue Cloud", fr: "CPQ & Revenue Cloud" },
  { value: "billing", en: "Billing & subscriptions", fr: "Facturation & abonnements" },
  { value: "integrations", en: "Salesforce, ERP & integrations", fr: "Salesforce, ERP & intégrations" },
  { value: "data_ai", en: "Data & AI", fr: "Data & IA" },
  { value: "other", en: "Another issue", fr: "Autre enjeu" },
] as const;

const TIMELINES = [
  { value: "asap", en: "As soon as possible", fr: "Dès que possible" },
  { value: "3_months", en: "Within 3 months", fr: "Dans les 3 mois" },
  { value: "later", en: "More than 3 months", fr: "Plus de 3 mois" },
  { value: "exploring", en: "Just exploring", fr: "Je me renseigne" },
] as const;

const ORIENTATION: Record<(typeof NEEDS)[number]["value"], { en: string; fr: string }> = {
  cpq_revenue_cloud: {
    en: "This usually starts with a Darix CPQ or Revenue Cloud framing session.",
    fr: "Cela démarre en général par une session de cadrage CPQ ou Revenue Cloud avec Darix.",
  },
  billing: {
    en: "This usually starts with reconciling your CRM and billing data with Darix.",
    fr: "Cela démarre en général par une réconciliation des données CRM et facturation avec Darix.",
  },
  integrations: {
    en: "This usually starts with a platform audit of your Salesforce, ERP, and integrations.",
    fr: "Cela démarre en général par un audit plateforme de votre Salesforce, ERP et intégrations.",
  },
  data_ai: {
    en: "This usually starts with a review of your data quality and where AI can realistically help.",
    fr: "Cela démarre en général par une revue de la qualité de vos données et des endroits où l'IA peut réellement aider.",
  },
  other: {
    en: "Describe the issue below; we'll route it to the right conversation.",
    fr: "Décrivez l'enjeu ci-dessous, nous l'orienterons vers le bon échange.",
  },
};

const stepThreeSchema = z.object({
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
  const [need, setNeed] = useState<(typeof NEEDS)[number]["value"] | "">(preselected);
  const [description, setDescription] = useState("");
  const [tools, setTools] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState<(typeof TIMELINES)[number]["value"] | "">("");
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

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

  const goNext = () => {
    if (step === 1 && !need) {
      setErrors({ need: isEn ? "Pick a need to continue." : "Choisissez un besoin pour continuer." });
      return;
    }
    if (step === 2 && !description.trim()) {
      setErrors({ description: isEn ? "Describe the problem to continue." : "Décrivez le problème pour continuer." });
      return;
    }
    setErrors({});
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limited) return;

    const parsed = stepThreeSchema.safeParse(contact);
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
      const needLabel = NEEDS.find((n) => n.value === need);
      const timelineLabel = TIMELINES.find((t) => t.value === timeline);
      const message = [
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
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center card-shadow">
        <h2 className="mb-3 text-xl font-medium">
          {isEn ? "Your request is recorded." : "Votre demande est enregistrée."}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {isEn
            ? "Someone will get back to you with next steps."
            : "Quelqu'un revient vers vous avec la prochaine étape."}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <BookCallButton size="lg">{isEn ? "Choose a 30-min slot" : "Choisir un créneau de 30 minutes"}</BookCallButton>
          <a
            href="/darix"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-base font-medium hover:bg-accent"
          >
            {isEn ? "Explore Darix" : "Explorer l'expertise Darix"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 card-shadow">
      <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>{isEn ? `Step ${step} of 3` : `Étape ${step} sur 3`}</span>
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
      </div>

      {limited && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {isEn
            ? "You've reached the maximum number of submissions for today. Please try again in 24 hours."
            : "Vous avez atteint le nombre maximum de soumissions pour aujourd'hui. Réessayez dans 24 heures."}
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {isEn ? "Failed to send your request. Please try again." : "Échec de l'envoi de votre demande. Veuillez réessayer."}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <p className="mb-1 text-lg font-medium">{isEn ? "What's the need?" : "Le besoin"}</p>
          {NEEDS.map((n) => (
            <label
              key={n.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors ${need === n.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
            >
              <input type="radio" name="need" checked={need === n.value} onChange={() => setNeed(n.value)} className="h-4 w-4" />
              {isEn ? n.en : n.fr}
            </label>
          ))}
          {errors.need && <p className="text-xs text-destructive">{errors.need}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <p className="mb-1 text-lg font-medium">{isEn ? "The context" : "Le contexte"}</p>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {isEn ? "Describe the problem" : "Décrivez le problème"} *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">{isEn ? "Current tools (optional)" : "Outils actuels (facultatif)"}</label>
              <input
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{isEn ? "Budget (optional)" : "Budget (facultatif)"}</label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Timeline" : "Calendrier"}</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {TIMELINES.map((t) => (
                <label
                  key={t.value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${timeline === t.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
                >
                  <input type="radio" name="timeline" checked={timeline === t.value} onChange={() => setTimeline(t.value)} className="h-4 w-4" />
                  {isEn ? t.en : t.fr}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={onSubmit} className="space-y-5">
          <p className="mb-1 text-lg font-medium">{isEn ? "Orientation and contact details" : "Orientation et coordonnées"}</p>
          {need && (
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              {isEn ? ORIENTATION[need].en : ORIENTATION[need].fr}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">{isEn ? "Name" : "Nom"} *</label>
              <input
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                disabled={limited}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email *</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                disabled={limited}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Company" : "Entreprise"} *</label>
            <input
              value={contact.company}
              onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
              disabled={limited}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
          </div>

          {showCaptcha && !limited && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                {isEn ? "Spam protection" : "Protection anti-spam"}
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
            {status === "submitting" ? (isEn ? "Sending..." : "Envoi...") : isEn ? "Send my request" : "Envoyer ma demande"}
          </button>
        </form>
      )}

      {step < 3 && (
        <div className="mt-6 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              {isEn ? "Back" : "Retour"}
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            {isEn ? "Continue" : "Continuer"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
