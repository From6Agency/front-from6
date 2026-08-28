"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "fr";

const UI = {
  en: {
    "nav.home": "Home",
    "nav.advisory": "Advisory",
    "nav.investments": "Our Projects",
    "nav.media": "Media",
    "nav.about": "About",
    "nav.contact": "Contact",
    "footer.legal": "Legal Mentions",
    "footer.privacy": "Privacy Policy",
    "footer.copyright": "© 2025 FROM 6 AGENCY. All rights reserved.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.advisory": "Advisory",
    "nav.investments": "Nos Projets",
    "nav.media": "Media",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Politique de confidentialité",
    "footer.copyright": "© 2025 FROM 6 AGENCY. Tous droits réservés.",
  },
} as const;

type UIKey = keyof typeof UI.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: UIKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("f6a-lang");
    if (stored === "en" || stored === "fr") setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem("f6a-lang", lang);
  };

  const t = (key: UIKey) => UI[language][key] ?? key;

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
