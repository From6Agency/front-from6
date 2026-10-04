"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { T } from "@/components/Bilingual";
import { Mark } from "@/components/brand/Logo";

export type DoorKey = "companies" | "founders";

export const DOORS: Array<{
  key: DoorKey;
  href: string;
  title: { en: string; fr: string };
  question: { en: string; fr: string };
  steps: Array<{ en: string; fr: string }>;
  cta: { en: string; fr: string };
}> = [
  {
    key: "companies",
    href: "/diagnostic",
    title: { en: "Companies", fr: "Entreprises" },
    question: { en: "Are your systems slowing your growth?", fr: "Vos systèmes freinent votre croissance ?" },
    // La chaîne Lead-to-Cash, spécialité de Franck : l'ordre porte du sens.
    steps: [
      { en: "Quote", fr: "Devis" },
      { en: "Contract", fr: "Contrat" },
      { en: "Invoice", fr: "Facture" },
      { en: "Cash", fr: "Encaissement" },
    ],
    cta: { en: "Assess my need", fr: "Évaluer mon besoin" },
  },
  {
    key: "founders",
    href: "/proposer-un-projet",
    title: { en: "Founders", fr: "Fondateurs" },
    question: { en: "Looking for an investor who knows the field?", fr: "Vous cherchez un investisseur qui connaît le terrain ?" },
    // Les quatre formes d'appui réelles (PRODUCT.md), sans mention de ticket.
    steps: [
      { en: "Advisory", fr: "Conseil" },
      { en: "Involvement", fr: "Implication" },
      { en: "Investment", fr: "Investissement" },
      { en: "Co-founding", fr: "Co-fondation" },
    ],
    cta: { en: "Present my project", fr: "Présenter mon projet" },
  },
];

/* Les deux portes du premier écran, en bandes pleine largeur et courtes : le
   public en titre d'affiche, sa question, l'action. Les étapes vivent dans
   l'illustration au-dessus, qui s'allume sur la voie de la porte survolée. */
export function DoorBands({ active, onActive, className }: { active: DoorKey | null; onActive: (key: DoorKey | null) => void; className?: string }) {
  return (
    <div className={className}>
      <div className="doors border-y border-border" data-active={active ?? undefined}>
        {DOORS.map((door, index) => {
          const isActive = active === door.key;
          return (
            <Fragment key={door.key}>
            <Link
              href={door.href}
              data-state={isActive ? "active" : undefined}
              onPointerEnter={() => onActive(door.key)}
              onPointerLeave={() => onActive(null)}
              onFocus={() => onActive(door.key)}
              onBlur={() => onActive(null)}
              className="door group grid gap-2 border-b border-border py-4 last:border-b-0 md:gap-6 md:py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-10"
            >
              <h2 className={`text-[2rem] leading-[0.95] transition-colors duration-200 md:text-[2.75rem] lg:text-[3.25rem] ${isActive ? "text-signal" : "text-foreground"}`}>
                <T en={door.title.en} fr={door.title.fr} />
              </h2>
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <p className="text-balance text-lg leading-tight md:text-xl lg:text-2xl">
                  <T en={door.question.en} fr={door.question.fr} />
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-signal">
                  <T en={door.cta.en} fr={door.cta.fr} />
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </Link>
            {index === 0 && <MobileLink />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* Sur téléphone, le schéma complet n'existe pas : un connecteur sobre entre les
   deux portes, le logo F6 sur le filet, relié aux deux parcours, avec un point
   qui descend de l'un vers l'autre. Masqué dès md, où le schéma prend le relais. */
function MobileLink() {
  return (
    <div className="mobile-link relative flex h-16 items-center justify-center md:hidden" aria-hidden="true">
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-muted-foreground" />
      <span className="mobile-link-dot absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-signal" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-muted-foreground/60 bg-background text-foreground">
        <Mark width={20} />
      </span>
    </div>
  );
}
