"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { T } from "@/components/Bilingual";
import { LogoHorizontal } from "@/components/brand/Logo";

const GROUPS = [
  {
    title_en: "Your project",
    title_fr: "Votre projet",
    links: [
      { en: "Assess your revenue needs", fr: "Évaluer vos enjeux de revenus", href: "/diagnostic" },
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
      { en: "Podcasts & talks", fr: "Podcasts et interventions", href: "/media" },
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

/* Pied de page sur Ink : il prolonge la bande noire de la home ; sur les
   autres pages il ouvre sa propre bande à coins arrondis. */
export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <footer className={pathname === "/" ? "foot sonho" : "foot sonho is-standalone"} data-tone="dark">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="foot-logo" href="/" aria-label="From 6 Agency, accueil">
              <LogoHorizontal className="logo" />
            </Link>
            <p>
              <T
                en="Franck Berthelot's entrepreneurial platform: advisory, investment, and Darix."
                fr="La plateforme entrepreneuriale de Franck Berthelot : conseil, investissement et Darix."
              />
            </p>
          </div>

          {GROUPS.map((group) => (
            <div className="foot-col" key={group.title_en}>
              <p className="foot-title">
                <T en={group.title_en} fr={group.title_fr} />
              </p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <T en={link.en} fr={link.fr} />
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <T en={link.en} fr={link.fr} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot-base">
          <p className="tnum">{t("footer.copyright")}</p>
          <p className="foot-legal">
            <a className="foot-in" href="https://www.linkedin.com/company/from-6-agency/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="ic" width={16} height={16} strokeWidth={1.9} aria-hidden="true" />
              LinkedIn
            </a>
            <span aria-hidden="true">|</span>
            <Link href="/legal-notice">{t("footer.legal")}</Link>
            <span aria-hidden="true">|</span>
            <Link href="/privacy-policy">{t("footer.privacy")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
