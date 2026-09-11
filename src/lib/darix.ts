// L'offre Darix telle que publiée sur darix.io (src/lib/siteNav.ts du repo
// darix, six lignes). From 6 la résume et renvoie le détail vers darix.io :
// une page = un sujet, pas deux catalogues qui se concurrencent.
export const DARIX_URL = "https://darix.io";

export function darixLink(path: string, campaign: string) {
  return `${DARIX_URL}${path}?utm_source=from6agency&utm_medium=referral&utm_campaign=${campaign}`;
}

export const DARIX_OFFERS: Array<{ key: string; path: string; label: { en: string; fr: string }; teaser: { en: string; fr: string } }> = [
  {
    key: "advisory",
    path: "/advisory",
    label: { en: "Advisory", fr: "Advisory" },
    teaser: {
      en: "Salesforce audits, architecture and roadmap, so you decide before you invest.",
      fr: "Audits, architecture et roadmap Salesforce pour décider avant d'investir.",
    },
  },
  {
    key: "quote-to-cash",
    path: "/quote-to-cash",
    label: { en: "Quote-to-Cash", fr: "Quote-to-Cash" },
    teaser: {
      en: "From catalog to cash: CPQ, Revenue Cloud Advanced and billing.",
      fr: "Du catalogue à l'encaissement : CPQ, Revenue Cloud Advanced et facturation.",
    },
  },
  {
    key: "delivery",
    path: "/delivery",
    label: { en: "Delivery", fr: "Delivery" },
    teaser: {
      en: "Architect-led Salesforce implementation, from scoping to go-live.",
      fr: "Implémentation Salesforce menée par des architectes, du cadrage à la mise en production.",
    },
  },
  {
    key: "integrations",
    path: "/integrations",
    label: { en: "Integrations", fr: "Intégrations" },
    teaser: {
      en: "Governed flows between Salesforce, your ERP, your billing and your data platforms.",
      fr: "Flux gouvernés entre Salesforce, votre ERP, votre facturation et vos plateformes data.",
    },
  },
  {
    key: "service-excellence",
    path: "/service-excellence",
    label: { en: "Service Excellence", fr: "Service Excellence" },
    teaser: {
      en: "Service Cloud and Field Service, from inbound case to on-site work order.",
      fr: "Service Cloud et Field Service, du ticket entrant jusqu'à l'intervention terrain.",
    },
  },
  {
    key: "augmented-intelligence",
    path: "/augmented-intelligence",
    label: { en: "Augmented Intelligence", fr: "Augmented Intelligence" },
    teaser: {
      en: "AI applied to Salesforce as an accelerator, with the guardrails that make it usable.",
      fr: "L'IA appliquée à Salesforce comme accélérateur, avec les garde-fous qui la rendent utilisable.",
    },
  },
];
