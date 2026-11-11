"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RESOURCES } from "@/lib/resources";

// The server always renders English (title, description, lang), which is what
// crawlers read. When the visitor reads the site in French, the tab title, the
// description and the `lang` attribute follow, so nothing English is left
// around a French page. Switching back restores what the server sent.
const SUFFIX = " · FROM 6 AGENCY";
const FR: Record<string, { title: string; description: string }> = {
  "/": {
    title: "FROM 6 AGENCY | Franck Berthelot, entrepreneur et investisseur",
    description:
      "From 6 relie les entreprises à l'expertise de Darix sur les systèmes de revenus et accompagne les fondateurs par le conseil et l'investissement.",
  },
  "/advisory": {
    title: "Salesforce et opérations de revenus avec Darix" + SUFFIX,
    description:
      "Structurez vos opérations de revenus : règles commerciales, CPQ, facturation, intégrations et données, cadrées avec From 6 et exécutées par Darix.",
  },
  "/darix": {
    title: "From 6 et Darix, le lien entre les deux" + SUFFIX,
    description:
      "Darix est l'équipe opérationnelle cofondée par Franck Berthelot pour les projets Salesforce, CPQ, facturation et systèmes de revenus.",
  },
  "/investments": {
    title: "Investissement et accompagnement des fondateurs" + SUFFIX,
    description:
      "L'expérience d'un entrepreneur de terrain à vos côtés : investissement, conseil et accompagnement opérationnel pour les fondateurs en phase de démarrage.",
  },
  "/portfolio": {
    title: "Darix, MicePro, 6WAY | Les projets de From 6" + SUFFIX,
    description:
      "Les entreprises que Franck Berthelot construit et dans lesquelles il investit, avec son rôle réel et le statut actuel de chaque projet.",
  },
  "/diagnostic": {
    title: "Diagnostic" + SUFFIX,
    description: "Un diagnostic court pour identifier la prochaine étape sur vos systèmes de revenus, avant tout appel.",
  },
  "/proposer-un-projet": {
    title: "Présenter un projet" + SUFFIX,
    description: "Présentez votre entreprise, son stade et l'appui recherché : investissement, conseil ou partenaire opérationnel.",
  },
  "/ressources": {
    title: "Mieux préparer vos décisions" + SUFFIX,
    description:
      "Des guides pour cadrer un projet Lead-to-Cash, CPQ ou d'alignement entre CRM et facturation avant votre premier échange avec Darix.",
  },
  "/media": {
    title: "Médias et interventions" + SUFFIX,
    description: "Podcasts, articles et interventions de Franck Berthelot sur les systèmes de revenus, le RevOps et l'IA.",
  },
  "/about": {
    title: "Franck Berthelot | Parcours, Darix et From 6" + SUFFIX,
    description:
      "Le parcours de Franck Berthelot entre finance, systèmes d'entreprise et entrepreneuriat, et le lien entre From 6 et Darix.",
  },
  "/contact": {
    title: "Contact" + SUFFIX,
    description:
      "Choisissez votre parcours : un besoin de systèmes de revenus pour Darix, un projet à présenter, ou une autre demande, média ou partenariat.",
  },
  "/legal-notice": {
    title: "Mentions légales" + SUFFIX,
    description: "Mentions légales et informations sur l'éditeur du site FROM 6 AGENCY.",
  },
  "/privacy-policy": {
    title: "Politique de confidentialité" + SUFFIX,
    description: "Politique de confidentialité de FROM 6 AGENCY.",
  },
};
for (const resource of RESOURCES) {
  FR[`/ressources/${resource.slug}`] = { title: resource.title.fr + SUFFIX, description: resource.excerpt.fr };
}

export function LocalizedHead() {
  const { language } = useLanguage();
  const pathname = usePathname();
  // What the server sent for each page, kept so English can be restored.
  const english = useRef(new Map<string, { title: string; description: string }>());

  useEffect(() => {
    document.documentElement.lang = language;
    const fr = FR[pathname.replace(/\/$/, "") || "/"];
    if (!fr) return;
    const key = pathname;
    const apply = () => {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (language === "fr") {
        if (document.title !== fr.title) {
          english.current.set(key, { title: document.title, description: meta?.content ?? "" });
          document.title = fr.title;
        }
        if (meta && meta.content !== fr.description) meta.setAttribute("content", fr.description);
      } else {
        const saved = english.current.get(key);
        if (saved && document.title === fr.title) {
          document.title = saved.title;
          meta?.setAttribute("content", saved.description);
        }
      }
    };
    apply();
    // Next sets the English title again on each navigation: follow it.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language, pathname]);

  return null;
}
