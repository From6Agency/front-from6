"use client";

import { useId, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Calculator, CheckCircle2, CircleAlert, Loader2, Upload, X } from "lucide-react";
import { Cta } from "@/components/Cta";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Le cadre du formulaire : une seule carte, jamais de carte dans la carte. */
export function FormCard({ children, className, ref }: { children: ReactNode; className?: string; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn("scroll-mt-28 rounded-[28px] bg-card p-6 shadow-[var(--shadow-card)] sm:p-9", className)}>
      {children}
    </div>
  );
}

/* Au changement d'étape, si le haut de la carte est sorti de l'écran (mobile,
   bouton Continuer en bas d'une longue étape), on le ramène en vue. */
export function useScrollToCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const reveal = () => {
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });
  };
  return { ref, reveal };
}

/* Rail de progression : titre de l'étape, compteur, trois segments qui se remplissent. */
export function StepRail({ step, total, title, isEn }: { step: number; total: number; title: string; isEn: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-sans text-lg font-medium leading-snug tracking-normal">{title}</h2>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {step}/{total}
        </span>
      </div>
      <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-hidden="true">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div key={n} className="h-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full w-full rounded-full bg-signal"
              style={{ originX: 0 }}
              initial={false}
              animate={{ scaleX: n <= step ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
            />
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {isEn ? `Step ${step} of ${total}: ${title}` : `Étape ${step} sur ${total} : ${title}`}
      </p>
    </div>
  );
}

/* Le contenu d'une étape glisse dans le sens du parcours ; l'ancien sort plus vite qu'il n'entre. */
export function StepPane({ step, direction, children }: { step: number; direction: 1 | -1; children: ReactNode }) {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : 28 * direction;
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: offset }}
        animate={{ opacity: 1, x: 0, transition: { duration: reduce ? 0.12 : 0.24, ease: EASE } }}
        exit={{ opacity: 0, x: -offset * 0.6, transition: { duration: reduce ? 0.08 : 0.14, ease: "easeIn" } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export const inputClass =
  "h-12 w-full rounded-[14px] border border-transparent bg-muted px-4 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/70 hover:bg-border/70 focus:border-signal focus:bg-background focus:ring-2 focus:ring-signal/15 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive";

export const textareaClass =
  "min-h-28 w-full resize-y rounded-[14px] border border-transparent bg-muted px-4 py-3 text-[0.9375rem] leading-relaxed text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/70 hover:bg-border/70 focus:border-signal focus:bg-background focus:ring-2 focus:ring-signal/15 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive";

/* Étiquette, champ, erreur : le champ est passé en enfant avec l'id fourni. */
export function Field({
  id,
  label,
  optionalLabel,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium">
        <span>{label}</span>
        {optionalLabel && <span className="text-xs font-normal text-muted-foreground">{optionalLabel}</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive" role="alert">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export interface ChoiceOption<V extends string> {
  value: V;
  label: string;
  description?: string;
}

/* Liste de choix exclusifs : lignes arrondies, indicateur dessiné, radio natif pour le clavier. */
export function ChoiceGroup<V extends string>({
  legend,
  name,
  value,
  onChange,
  options,
  columns = 1,
  error,
  disabled,
}: {
  legend: string;
  name: string;
  value: V | "";
  onChange: (v: V) => void;
  options: ReadonlyArray<ChoiceOption<V>>;
  columns?: 1 | 2;
  error?: string;
  disabled?: boolean;
}) {
  const errorId = useId();
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-2 block text-sm font-medium">{legend}</legend>
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 text-[0.9375rem] leading-snug transition-colors duration-150",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal/30",
                checked ? "border-signal bg-signal-wash" : "border-transparent bg-muted hover:bg-border",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                disabled={disabled}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
                  checked ? "border-signal" : "border-muted-foreground/50",
                )}
              >
                <span
                  className={cn("h-2 w-2 rounded-full bg-signal transition-transform duration-150 ease-out", checked ? "scale-100" : "scale-0")}
                />
              </span>
              <span className="min-w-0">
                <span className={cn("block", checked && "font-medium")}>{option.label}</span>
                {option.description && <span className="mt-0.5 block text-sm text-muted-foreground">{option.description}</span>}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs text-destructive" role="alert">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* Zone de dépôt de fichier : un seul document, nom et taille affichés, retrait en un clic. */
export function FileDrop({
  id,
  file,
  onChange,
  label,
  hint,
  disabled,
}: {
  id: string;
  file: File | null;
  onChange: (f: File | null) => void;
  label: string;
  hint: string;
  disabled?: boolean;
}) {
  const size = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : null;
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-signal bg-signal-wash px-4 py-3 text-sm">
          <span className="min-w-0 truncate">
            {file.name} <span className="text-muted-foreground">({size})</span>
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground",
            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal/30",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <Upload className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>{hint}</span>
          <input
            id={id}
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            disabled={disabled}
            className="sr-only"
          />
        </label>
      )}
    </div>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

export function CaptchaBlock({
  id,
  num1,
  num2,
  answer,
  onChange,
  invalid,
  isEn,
}: {
  id: string;
  num1: number;
  num2: number;
  answer: string;
  onChange: (v: string) => void;
  invalid: boolean;
  isEn: boolean;
}) {
  return (
    <div className="rounded-2xl bg-muted/60 p-4">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
        <Calculator className="h-4 w-4 text-muted-foreground" strokeWidth={2} aria-hidden="true" />
        {isEn ? "Quick check, are you human?" : "Vérification rapide, êtes-vous humain ?"}
      </label>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-lg tabular-nums">
          {num1} + {num2} =
        </span>
        <input id={id} type="number" inputMode="numeric" value={answer} onChange={(e) => onChange(e.target.value)} className={cn(inputClass, "w-24 bg-background")} />
        {invalid && <span className="text-sm text-destructive">{isEn ? "Wrong answer, try again." : "Mauvaise réponse, réessayez."}</span>}
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled,
  loading,
  loadingLabel,
  className,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
}) {
  return (
    <Cta type={type} onClick={onClick} disabled={disabled || loading} arrow={loading ? undefined : "right"} className={className}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />}
      {loading ? (loadingLabel ?? children) : children}
    </Cta>
  );
}

export function BackButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {children}
    </button>
  );
}

/* Accusé de réception : la coche se dessine, la référence reste sous les yeux. */
export function SuccessCard({ title, reference, isEn, children }: { title: string; reference: string; isEn: boolean; children?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <FormCard>
      <div role="status" aria-live="polite">
        <motion.div
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-signal text-white"
        >
          <CheckCircle2 className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </motion.div>
        <h2 className="text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEn ? "Reference" : "Référence"} <span className="tabular-nums text-foreground">{reference}</span>
        </p>
        {children && <div className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </FormCard>
  );
}
