"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { makeReference } from "@/lib/reference";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  FormCard,
  StepRail,
  StepPane,
  Field,
  ChoiceGroup,
  FileDrop,
  FormAlert,
  CaptchaBlock,
  PrimaryButton,
  BackButton,
  SuccessCard,
  useScrollToCard,
  inputClass,
  textareaClass,
} from "@/components/form/FormKit";

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

type Stage = (typeof STAGES)[number]["value"];
type NeedType = (typeof NEED_TYPES)[number]["value"];

const stepOneSchema = z.object({
  sector: z.string().trim().min(1).max(100),
  stage: z.string().min(1),
});

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(100),
});

export function ProjectForm() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState<Stage | "">("");
  const [problem, setProblem] = useState("");
  const [traction, setTraction] = useState("");
  const [needType, setNeedType] = useState<NeedType | "">("");
  const [website, setWebsite] = useState("");
  const [amount, setAmount] = useState("");
  const [deckUrl, setDeckUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
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
    ? ["Your project and its stage", "What you do and the support you need", "Your contact details"]
    : ["Votre projet et son stade", "Ce que vous faites et l'appui recherché", "Vos coordonnées"];
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
    if (step === 1) {
      const parsed = stepOneSchema.safeParse({ sector, stage });
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const key = String(issue.path[0]);
          fieldErrors[key] = key === "stage" ? (isEn ? "Pick the stage to continue." : "Choisissez le stade pour continuer.") : required;
        }
        setErrors(fieldErrors);
        return;
      }
    }
    if (step === 2 && !problem.trim()) {
      setErrors({ problem: isEn ? "A few lines on the problem you solve are enough." : "Quelques lignes sur le problème résolu suffisent." });
      return;
    }
    if (step === 2 && file && file.size > 10 * 1024 * 1024) {
      setErrors({ file: isEn ? "The file exceeds 10 MB." : "Le fichier dépasse 10 Mo." });
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
      let documentUrl: string | null = null;
      if (file) {
        if (file.size > 10 * 1024 * 1024) throw new Error("file-too-large");
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("pitch-decks").upload(fileName, file);
        if (uploadError) throw uploadError;
        documentUrl = uploadData.path;
      }

      const ref = makeReference();
      const stageLabel = STAGES.find((s) => s.value === stage);
      const needLabel = NEED_TYPES.find((n) => n.value === needType);
      const message = [
        `Réf. ${ref}`,
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
      <SuccessCard title={isEn ? "Your project is recorded." : "Votre projet est enregistré."} reference={reference} isEn={isEn}>
        <p>
          {isEn
            ? "Every file is read by Franck himself, not screened by a form. You will get a first answer by email, whatever it is."
            : "Chaque dossier est lu par Franck lui-même, pas filtré par un formulaire. Vous recevrez une première réponse par email, quelle qu'elle soit."}
        </p>
        <div className="mt-5">
          <a href="/portfolio" className="text-sm font-medium text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
            {isEn ? "Meanwhile, the companies he is already involved in" : "En attendant, les entreprises dans lesquelles il s'implique déjà"}
          </a>
        </div>
      </SuccessCard>
    );
  }

  const stageOptions = STAGES.map((s) => ({ value: s.value, label: isEn ? s.en : s.fr }));
  const needOptions = NEED_TYPES.map((n) => ({ value: n.value, label: isEn ? n.en : n.fr }));

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
            ? "The project could not be recorded. Your answers are kept: try again, or write to franck.berthelot@from6agency.com."
            : "Le projet n'a pas pu être enregistré. Vos réponses sont conservées : réessayez, ou écrivez à franck.berthelot@from6agency.com."}
        </FormAlert>
      )}

      <StepPane step={step} direction={direction}>
        {step === 1 && (
          <div className="space-y-5">
            <Field id="proj-sector" label={isEn ? "Sector" : "Secteur"} error={errors.sector} hint={isEn ? "Any sector is welcome; name yours." : "Tous les secteurs sont bienvenus, nommez le vôtre."}>
              <input
                id="proj-sector"
                value={sector}
                onChange={(e) => {
                  setSector(e.target.value);
                  clearError("sector");
                }}
                placeholder={isEn ? "Software, applied AI, services, retail..." : "Logiciel, IA appliquée, services, commerce..."}
                className={inputClass}
                aria-invalid={Boolean(errors.sector)}
                aria-describedby={errors.sector ? "proj-sector-error" : undefined}
                autoFocus
              />
            </Field>
            <ChoiceGroup
              legend={isEn ? "Stage" : "Stade"}
              name="stage"
              value={stage}
              onChange={(v) => {
                setStage(v);
                clearError("stage");
              }}
              options={stageOptions}
              columns={2}
              error={errors.stage}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field id="proj-problem" label={isEn ? "The problem you solve" : "Le problème que vous résolvez"} error={errors.problem}>
              <textarea
                id="proj-problem"
                value={problem}
                onChange={(e) => {
                  setProblem(e.target.value);
                  clearError("problem");
                }}
                placeholder={isEn ? "For whom, and what changes for them" : "Pour qui, et ce qui change pour eux"}
                className={textareaClass}
                aria-invalid={Boolean(errors.problem)}
                aria-describedby={errors.problem ? "proj-problem-error" : undefined}
                autoFocus
              />
            </Field>
            <Field id="proj-traction" label={isEn ? "Customers or traction" : "Clients ou traction"} optionalLabel={isEn ? "optional" : "facultatif"}>
              <textarea id="proj-traction" value={traction} onChange={(e) => setTraction(e.target.value)} className={`${textareaClass} min-h-20`} />
            </Field>
            <ChoiceGroup legend={isEn ? "Support you are looking for" : "Appui recherché"} name="needType" value={needType} onChange={setNeedType} options={needOptions} columns={2} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="proj-website" label={isEn ? "Website" : "Site"} optionalLabel={isEn ? "optional" : "facultatif"}>
                <input id="proj-website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className={inputClass} inputMode="url" />
              </Field>
              <Field id="proj-amount" label={isEn ? "Amount sought" : "Montant recherché"} optionalLabel={isEn ? "optional" : "facultatif"}>
                <input id="proj-amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={isEn ? "If you already know it" : "Si vous le connaissez déjà"} className={inputClass} />
              </Field>
            </div>
            <Field id="proj-deck" label={isEn ? "Deck link" : "Lien du deck"} optionalLabel={isEn ? "optional" : "facultatif"}>
              <input id="proj-deck" value={deckUrl} onChange={(e) => setDeckUrl(e.target.value)} placeholder="Notion, Google Drive, Pitch" className={inputClass} inputMode="url" />
            </Field>
            <FileDrop
              id="proj-file"
              file={file}
              onChange={(f) => {
                setFile(f);
                setErrors((e) => ({ ...e, file: "" }));
              }}
              label={isEn ? "Or attach the deck" : "Ou joignez le deck"}
              hint={isEn ? "PDF, PPT or DOC, 10 MB max" : "PDF, PPT ou DOC, 10 Mo max"}
            />
            {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}
          </div>
        )}

        {step === 3 && (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="proj-name" label={isEn ? "Name" : "Nom"} error={errors.name}>
                <input
                  id="proj-name"
                  value={contact.name}
                  onChange={(e) => updateContact("name", e.target.value)}
                  disabled={limited}
                  className={inputClass}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "proj-name-error" : undefined}
                  autoFocus
                />
              </Field>
              <Field id="proj-email" label="Email" error={errors.email}>
                <input
                  id="proj-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                  disabled={limited}
                  className={inputClass}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "proj-email-error" : undefined}
                />
              </Field>
            </div>
            <Field id="proj-company" label={isEn ? "Company or project name" : "Entreprise ou nom du projet"} error={errors.company}>
              <input
                id="proj-company"
                value={contact.company}
                onChange={(e) => updateContact("company", e.target.value)}
                disabled={limited}
                className={inputClass}
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "proj-company-error" : undefined}
              />
            </Field>

            {showCaptcha && !limited && (
              <CaptchaBlock id="proj-captcha" num1={captcha.num1} num2={captcha.num2} answer={captcha.answer} onChange={setCaptchaAnswer} invalid={captcha.isValid === false} isEn={isEn} />
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
                {isEn ? "Send my project" : "Envoyer mon projet"}
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
