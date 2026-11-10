"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

// Typographie seulement, aucun mot n'est touché : apostrophe courbe entre deux
// lettres, et en français une espace insécable avant : ; ? ! pour que le signe
// ne commence jamais une ligne.
const curly = (s: string) => s.replace(/(\p{L})'(\p{L})/gu, "$1’$2");
const french = (s: string) => curly(s).replace(/ ([:;?!])/g, " $1");

// Rend le texte EN par défaut (SSR, vu par les crawlers), puis bascule côté
// client selon la préférence de langue stockée. Le HTML initial reste donc
// toujours un texte réel et complet, jamais un état vide en attente de JS.
export function T({ en, fr }: { en: string; fr: string }) {
  const { language } = useLanguage();
  return <>{language === "fr" ? french(fr) : curly(en)}</>;
}
