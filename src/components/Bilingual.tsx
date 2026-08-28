"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

// Rend le texte EN par défaut (SSR, vu par les crawlers), puis bascule côté
// client selon la préférence de langue stockée. Le HTML initial reste donc
// toujours un texte réel et complet, jamais un état vide en attente de JS.
export function T({ en, fr }: { en: string; fr: string }) {
  const { language } = useLanguage();
  return <>{language === "fr" ? fr : en}</>;
}
