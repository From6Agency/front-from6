"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { AlertTriangle, Calculator, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";

const STAGES = [
  { value: "idea", en: "Idea or prototype", fr: "Idée ou prototype" },
  { value: "usable", en: "Usable product", fr: "Produit utilisable" },
  { value: "first_customers", en: "First customers", fr: "Premiers clients" },
  { value: "growth", en: "Growth", fr: "Croissance" },
] as const;

const NEED_TYPES = [
  { value: "investment", en: "Investment", fr: "Investissement" },
  { value: "advisory", en: "Operational support", fr: "Accompagnement opérationnel" },
  { value: "both", en: "Both", fr: "Les deux" },
  { value: "partnership", en: "Partnership or co-founding", fr: "Partenariat ou cofondation" },
] as const;

const stepOneSchema = z.object({
  sector: z.string().trim().min(1).max(100),
  stage: z.string().min(1),
});

const stepThreeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(100),
});

export function ProjectForm() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState<(typeof STAGES)[number]["value"] | "">("");
  const [problem, setProblem] = useState("");
  const [traction, setTraction] = useState("");
  const [needType, setNeedType] = useState<(typeof NEED_TYPES)[number]["value"] | "">("");
  const [website, setWebsite] = useState("");
  const [amount, setAmount] = useState("");
  const [deckUrl, setDeckUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
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
    if (step === 1) {
      const parsed = stepOneSchema.safeParse({ sector, stage });
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
        setErrors(fieldErrors);
        return;
      }
    }
    if (step === 2 && !problem.trim()) {
      setErrors({ problem: isEn ? "Describe the problem you solve to continue." : "Décrivez le problème résolu pour continuer." });
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
      let documentUrl: string | null = null;
      if (file) {
        if (file.size > 10 * 1024 * 1024) throw new Error("file-too-large");
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("pitch-decks").upload(fileName, file);
        if (uploadError) throw uploadError;
        documentUrl = uploadData.path;
      }

      const stageLabel = STAGES.find((s) => s.value === stage);
      const needLabel = NEED_TYPES.find((n) => n.value === needType);
      const message = [
        `[Projet entrepreneurial]`,
        `Secteur : ${sector.trim()}`,
        stageLabel && `Stade : ${stageLabel.fr}`,
        `Problème résolu : ${problem.trim()}`,
        traction.trim() && `Traction : ${traction.trim()}`,
        needLabel && `Appui recherché : ${needLabel.fr}`,
        website.trim() && `Site : ${website.trim()}`,
        amount.trim() && `Montant recherché : ${amount.trim()}`,
        deckUrl.trim() && `Lien du deck : ${deckUrl.trim()}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        message,
        document_url: documentUrl,
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-contact-notification", {
          body: { name: parsed.data.name, email: parsed.data.email, company: parsed.data.company, message, documentUrl: documentUrl || undefined },
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
        <h2 className="mb-3 text-xl font-medium">{isEn ? "Your request is recorded." : "Votre demande est enregistrée."}</h2>
        <p className="mb-6 text-muted-foreground">
          {isEn ? "The file is reviewed by a human, we'll get back to you." : "Le dossier est examiné humainement, nous revenons vers vous."}
        </p>
        <a
          href="/portfolio"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-base font-medium hover:bg-accent"
        >
          {isEn ? "Discover the projects" : "Découvrir les projets"}
        </a>
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
          {isEn ? "Failed to send your project. Please try again." : "Échec de l'envoi de votre projet. Veuillez réessayer."}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <p className="mb-1 text-lg font-medium">{isEn ? "Project and stage" : "Projet et stade"}</p>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Sector" : "Secteur"} *</label>
            <input
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder={isEn ? "e.g. B2B SaaS, vertical software, other sector..." : "ex. SaaS B2B, logiciel métier, autre secteur..."}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.sector && <p className="mt-1 text-xs text-destructive">{errors.sector}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Stage" : "Stade"} *</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {STAGES.map((s) => (
                <label
                  key={s.value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${stage === s.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
                >
                  <input type="radio" name="stage" checked={stage === s.value} onChange={() => setStage(s.value)} className="h-4 w-4" />
                  {isEn ? s.en : s.fr}
                </label>
              ))}
            </div>
            {errors.stage && <p className="mt-1 text-xs text-destructive">{errors.stage}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <p className="mb-1 text-lg font-medium">{isEn ? "Activity and support needed" : "Activité et appui recherché"}</p>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Problem solved" : "Problème résolu"} *</label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.problem && <p className="mt-1 text-xs text-destructive">{errors.problem}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Customers or traction (optional)" : "Clients ou traction (facultatif)"}</label>
            <textarea
              rows={2}
              value={traction}
              onChange={(e) => setTraction(e.target.value)}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Support needed" : "Besoin"}</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {NEED_TYPES.map((n) => (
                <label
                  key={n.value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${needType === n.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
                >
                  <input type="radio" name="needType" checked={needType === n.value} onChange={() => setNeedType(n.value)} className="h-4 w-4" />
                  {isEn ? n.en : n.fr}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">{isEn ? "Website (optional)" : "Site (facultatif)"}</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{isEn ? "Amount sought (optional)" : "Montant recherché (facultatif)"}</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Deck link (optional)" : "Lien de deck (facultatif)"}</label>
            <input
              value={deckUrl}
              onChange={(e) => setDeckUrl(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label
              htmlFor="deck-upload"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground hover:border-muted-foreground/50"
            >
              <Upload className="h-4 w-4" />
              {file ? file.name : isEn ? "Attach a deck: PDF, PPT, or DOC (max 10MB)" : "Joindre un deck : PDF, PPT ou DOC (max 10 Mo)"}
            </label>
            <input
              id="deck-upload"
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={onSubmit} className="space-y-5">
          <p className="mb-1 text-lg font-medium">{isEn ? "Contact details" : "Coordonnées"}</p>
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
            <label className="mb-1.5 block text-sm font-medium">{isEn ? "Company or project name" : "Entreprise ou nom du projet"} *</label>
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
