"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/Bilingual";
import { Cta } from "@/components/Cta";
import { useLanguage } from "@/components/providers/LanguageProvider";

/* Sur téléphone, les deux portes restent sous le pouce : un dock de verre
   apparaît quand les portes du premier écran et la bande de fin sont toutes
   deux hors de vue, et se range pendant que le menu est ouvert. */
export function Dock() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) seen.add(entry.target);
        else seen.delete(entry.target);
      });
      setVisible(seen.size === 0);
    });
    ["#portes", "#parler"].forEach((selector) => {
      const target = document.querySelector(selector);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="dock" data-visible={visible ? "true" : "false"} aria-label={language === "en" ? "Companies, Founders" : "Entreprises, Fondateurs"} aria-hidden={!visible}>
      <Cta href="/diagnostic">
        <T en="Companies" fr="Entreprises" />
      </Cta>
      <Cta href="/proposer-un-projet" variant="soft">
        <T en="Founders" fr="Fondateurs" />
      </Cta>
    </nav>
  );
}
