"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { T } from "@/components/Bilingual";

const GROUPS = [
  {
    title_en: "Your project",
    title_fr: "Votre projet",
    links: [
      { en: "Assess your revenue needs", fr: "Évaluer vos enjeux revenue", href: "/diagnostic" },
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

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-3 flex items-center gap-2.5">
              <Image src="/brand/logo-f6a.png" alt="FROM 6 AGENCY" width={24} height={24} className="rounded" />
              <span className="text-sm font-medium">FROM 6 AGENCY</span>
            </Link>
            <p className="max-w-[22ch] text-sm text-muted-foreground">
              <T
                en="Franck Berthelot's entrepreneurial platform: advisory, investment, and Darix."
                fr="La plateforme entrepreneuriale de Franck Berthelot : conseil, investissement et Darix."
              />
            </p>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title_en}>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <T en={group.title_en} fr={group.title_fr} />
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <T en={link.en} fr={link.fr} />
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
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
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <span className="text-border">|</span>
            <Link href="/legal-notice" className="hover:text-foreground">
              {t("footer.legal")}
            </Link>
            <span className="text-border">|</span>
            <Link href="/privacy-policy" className="hover:text-foreground">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
