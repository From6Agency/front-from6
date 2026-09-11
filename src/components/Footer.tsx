"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { T } from "@/components/Bilingual";
import { LogoHorizontal } from "@/components/brand/Logo";

const GROUPS = [
  {
    title_en: "Your project",
    title_fr: "Votre projet",
    links: [
      { en: "Assess your revenue needs", fr: "Évaluer vos enjeux revenus", href: "/diagnostic" },
      { en: "Present a company", fr: "Présenter une entreprise", href: "/proposer-un-projet" },
      { en: "Another request", fr: "Autre demande", href: "/contact" },
    ],
  },
  {
    title_en: "Explore",
    title_fr: "Explorer",
    links: [
      { en: "Darix expertise", fr: "L'expertise Darix", href: "/darix" },
      { en: "Projects", fr: "Les projets", href: "/portfolio" },
      { en: "Podcasts & talks", fr: "Podcasts & interventions", href: "/media" },
    ],
  },
  {
    title_en: "Connect",
    title_fr: "Échanger",
    links: [
      { en: "Franck on LinkedIn", fr: "Franck sur LinkedIn", href: "https://www.linkedin.com/in/franckberthelot", external: true },
      { en: "From 6 on LinkedIn", fr: "From 6 sur LinkedIn", href: "https://www.linkedin.com/company/from-6-agency/", external: true },
      { en: "The journey", fr: "Le parcours", href: "/about" },
    ],
  },
];

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-signal";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="From 6 Agency, accueil" className="mb-4 inline-flex text-foreground">
              <LogoHorizontal width={140} />
            </Link>
            <p className="max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
              <T
                en="Franck Berthelot's entrepreneurial platform: advisory, investment, and Darix."
                fr="La plateforme entrepreneuriale de Franck Berthelot : conseil, investissement et Darix."
              />
            </p>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title_en}>
              <p className="label mb-3 text-muted-foreground">
                <T en={group.title_en} fr={group.title_fr} />
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <T en={link.en} fr={link.fr} />
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        <T en={link.en} fr={link.fr} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://www.linkedin.com/company/from-6-agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-signal"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              LinkedIn
            </a>
            <span className="text-border" aria-hidden="true">
              |
            </span>
            <Link href="/legal-notice" className="transition-colors hover:text-signal">
              {t("footer.legal")}
            </Link>
            <span className="text-border" aria-hidden="true">
              |
            </span>
            <Link href="/privacy-policy" className="transition-colors hover:text-signal">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
