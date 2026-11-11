// Contenu éditorial des guides /ressources. Pas de dépendance à la table
// Supabase `articles` : elle existe dans le schéma mais n'a aucune ligne
// publiée pour l'instant, donc une lecture DB rendrait la page vide. À
// brancher sur `getArticles()` une fois que du contenu réel y est publié
// via l'admin Lovable.

export interface Resource {
  slug: string;
  category: { en: string; fr: string };
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  answer: { en: string; fr: string };
  sections: Array<{ heading: { en: string; fr: string }; body: { en: string; fr: string } }>;
  checklist: { en: string[]; fr: string[] };
  limits: { en: string; fr: string };
  needParam: string;
  publishedAt: string;
}

export const RESOURCES: Resource[] = [
  {
    slug: "audit-revenue",
    category: { en: "Insights", fr: "Insights" },
    title: {
      en: "What should you review before a Lead-to-Cash project?",
      fr: "Que faut-il examiner avant un projet Lead-to-Cash ?",
    },
    excerpt: {
      en: "The processes, sales rules, and information to gather before framing a project.",
      fr: "Les processus, règles commerciales et informations à réunir avant de cadrer un chantier.",
    },
    answer: {
      en: "Before starting a Lead-to-Cash project, review three things: the sales rules actually applied today (not the ones on paper), the path a contract follows from signature to invoice, and the systems each of these steps touches, CRM, CPQ, billing, and accounting.",
      fr: "Avant de démarrer un projet Lead-to-Cash, il faut examiner trois choses : les règles commerciales réellement appliquées aujourd'hui (pas celles écrites sur le papier), le parcours d'un contrat de la signature à la facture, et les systèmes que chacune de ces étapes traverse, CRM, CPQ, facturation et comptabilité.",
    },
    sections: [
      {
        heading: { en: "Sales rules as they're actually used", fr: "Les règles commerciales telles qu'elles sont réellement utilisées" },
        body: {
          en: "Discount policy, approval thresholds, bundle logic: these rules often drift from what's documented as sales teams find workarounds. Before any CPQ or Revenue Cloud work, someone needs to compare the written policy with what's happening in actual quotes.",
          fr: "Politique de remise, seuils d'approbation, logique de bundles : ces règles s'écartent souvent de ce qui est documenté, car les équipes commerciales trouvent des contournements. Avant tout chantier CPQ ou Revenue Cloud, il faut comparer la politique écrite avec ce qui se passe réellement dans les devis.",
        },
      },
      {
        heading: { en: "The contract's path to accounting", fr: "Le parcours du contrat jusqu'à la comptabilité" },
        body: {
          en: "Map every handoff: who creates the opportunity, who approves the quote, who triggers billing, who reconciles with accounting. Most Lead-to-Cash friction lives in these handoffs, not inside any single tool.",
          fr: "Cartographier chaque passage de relais : qui crée l'opportunité, qui approuve le devis, qui déclenche la facturation, qui rapproche avec la comptabilité. La majorité des frictions Lead-to-Cash se situent dans ces passages de relais, pas dans un outil pris isolément.",
        },
      },
      {
        heading: { en: "The systems and their overlaps", fr: "Les systèmes et leurs recouvrements" },
        body: {
          en: "List every system that holds a piece of this data (CRM, CPQ, billing, ERP) and where the same information exists in more than one place. Duplicated fields are usually the first source of data you can't trust.",
          fr: "Lister chaque système qui porte un morceau de cette donnée (CRM, CPQ, facturation, ERP) et repérer où une même information existe à plusieurs endroits. Les champs dupliqués sont en général la première source de données peu fiables.",
        },
      },
    ],
    checklist: {
      en: [
        "Current discount and approval policy, written and as practiced",
        "A handful of real recent contracts, from quote to invoice",
        "List of systems touched between CRM and accounting",
        "Known data discrepancies between CRM and billing",
      ],
      fr: [
        "Politique de remise et d'approbation actuelle, écrite et pratiquée",
        "Quelques contrats réels récents, du devis à la facture",
        "Liste des systèmes traversés entre le CRM et la comptabilité",
        "Écarts de données connus entre le CRM et la facturation",
      ],
    },
    limits: {
      en: "This is a starting checklist, not a substitute for a platform audit: it tells you what to bring to the first conversation, not how to fix what you find.",
      fr: "C'est une liste de départ, pas un substitut à un audit de plateforme : elle indique quoi apporter au premier échange, pas comment corriger ce que vous allez trouver.",
    },
    needParam: "audit",
    publishedAt: "2026-08-01",
  },
  {
    slug: "cadrer-projet-cpq",
    category: { en: "Insights", fr: "Insights" },
    title: {
      en: "How do you scope a CPQ project without starting from the license count?",
      fr: "Comment cadrer un projet CPQ sans partir du nombre de licences ?",
    },
    excerpt: {
      en: "Start from the catalog, the pricing rules, and the contract cycle to define the scope.",
      fr: "Partir du catalogue, des règles de prix et du cycle contractuel pour définir le périmètre.",
    },
    answer: {
      en: "A CPQ project should be scoped from the product catalog and pricing logic first, not from a license count. The number of seats tells you nothing about how complex your bundles, discount rules, or contract terms actually are.",
      fr: "Un projet CPQ doit d'abord se cadrer à partir du catalogue produit et de la logique de prix, pas du nombre de licences. Le nombre de sièges ne dit rien de la complexité réelle de vos bundles, de vos règles de remise ou de vos conditions contractuelles.",
    },
    sections: [
      {
        heading: { en: "Start with the catalog", fr: "Partir du catalogue" },
        body: {
          en: "List every product and service actually sold today, including the ones sold as exceptions or side agreements. A CPQ that only models the clean 80% of your catalog will get bypassed for the other 20%, which usually generates the most support tickets.",
          fr: "Lister tout ce qui est réellement vendu aujourd'hui, y compris ce qui se vend en exception ou par accord annexe. Un CPQ qui ne modélise que les 80% propres du catalogue sera contourné pour les 20% restants, qui génèrent en général le plus de tickets de support.",
        },
      },
      {
        heading: { en: "Then the pricing rules", fr: "Puis les règles de prix" },
        body: {
          en: "Discount tiers, approval chains, bundle dependencies: write down the actual logic before choosing any tool configuration. This is also where most of the ambiguity in a CPQ project comes from.",
          fr: "Paliers de remise, chaînes d'approbation, dépendances entre bundles : écrire la logique réelle avant de choisir une configuration d'outil. C'est aussi de là que vient la majorité des ambiguïtés d'un projet CPQ.",
        },
      },
      {
        heading: { en: "Then the contract cycle and dependencies", fr: "Puis le cycle contractuel et les dépendances" },
        body: {
          en: "Renewals, amendments, and upsells depend on how the original contract was structured in CPQ. Getting this wrong at scoping time is expensive to fix later, since it touches every renewal that follows.",
          fr: "Renouvellements, avenants et upsells dépendent de la façon dont le contrat d'origine a été structuré dans le CPQ. Se tromper à ce stade coûte cher à corriger plus tard, car cela touche chaque renouvellement qui suit.",
        },
      },
    ],
    checklist: {
      en: [
        "Full product and service catalog, including exceptions",
        "Written discount and approval logic",
        "Examples of renewals and amendments from existing contracts",
        "List of systems the quote needs to sync with (CRM, billing, ERP)",
      ],
      fr: [
        "Catalogue complet produits et services, exceptions incluses",
        "Logique de remise et d'approbation écrite",
        "Exemples de renouvellements et d'avenants sur des contrats existants",
        "Liste des systèmes avec lesquels le devis doit se synchroniser (CRM, facturation, ERP)",
      ],
    },
    limits: {
      en: "This defines a coherent first scope, not the full solution design: the detailed configuration still depends on the CPQ platform chosen and your existing Salesforce setup.",
      fr: "Cela définit un premier périmètre cohérent, pas la conception détaillée de la solution : la configuration fine dépend encore de la plateforme CPQ choisie et de votre paramétrage Salesforce existant.",
    },
    needParam: "cpq",
    publishedAt: "2026-08-01",
  },
  {
    slug: "crm-facturation",
    category: { en: "Insights", fr: "Insights" },
    title: {
      en: "How do you align Salesforce and billing?",
      fr: "Comment aligner Salesforce et la facturation ?",
    },
    excerpt: {
      en: "Clarify data ownership, business events, and how discrepancies are handled.",
      fr: "Clarifier la responsabilité des données, les événements métier et le traitement des écarts.",
    },
    answer: {
      en: "Aligning Salesforce and billing starts with deciding, field by field, which system owns each piece of data, then defining the business events that move data between them, and finally agreeing on how discrepancies get caught and corrected.",
      fr: "Aligner Salesforce et la facturation commence par décider, champ par champ, quel système porte chaque donnée, puis définir les événements métier qui font circuler la donnée entre les deux, et enfin s'accorder sur la façon dont les écarts sont détectés et corrigés.",
    },
    sections: [
      {
        heading: { en: "Decide who owns each field", fr: "Décider qui porte chaque champ" },
        body: {
          en: "Customer name, contract terms, payment status: each of these fields should have exactly one system of record. When both Salesforce and the billing tool can edit the same field, discrepancies are only a matter of time.",
          fr: "Nom du client, conditions contractuelles, statut de paiement : chacun de ces champs doit avoir un seul système de référence. Quand Salesforce et l'outil de facturation peuvent tous les deux modifier le même champ, les écarts ne sont qu'une question de temps.",
        },
      },
      {
        heading: { en: "Define the business events", fr: "Définir les événements métier" },
        body: {
          en: "A signed contract, an upgrade, a cancellation: each event should trigger one clear action in the other system, not a manual re-entry. This is usually where an integration project actually starts.",
          fr: "Un contrat signé, un changement d'offre, une résiliation : chaque événement doit déclencher une action claire dans l'autre système, pas une ressaisie manuelle. C'est généralement là que démarre réellement un projet d'intégration.",
        },
      },
      {
        heading: { en: "Plan for discrepancies", fr: "Prévoir le traitement des écarts" },
        body: {
          en: "Even a well-designed integration will drift over time. Decide in advance who reviews mismatches between CRM and billing, how often, and what the correction process looks like.",
          fr: "Même une intégration bien conçue dérive avec le temps. Décider à l'avance qui revoit les écarts entre CRM et facturation, à quelle fréquence, et à quoi ressemble le processus de correction.",
        },
      },
    ],
    checklist: {
      en: [
        "Field-by-field ownership map between Salesforce and billing",
        "List of business events that should sync automatically",
        "Current process, if any, for catching data mismatches",
        "Volume of manual re-entry happening today",
      ],
      fr: [
        "Cartographie champ par champ entre Salesforce et la facturation",
        "Liste des événements métier qui devraient se synchroniser automatiquement",
        "Processus actuel, s'il existe, pour détecter les écarts de données",
        "Volume de ressaisie manuelle aujourd'hui",
      ],
    },
    limits: {
      en: "This describes the questions to answer, not a specific integration architecture: the right pattern (native sync, middleware, custom) depends on your actual billing tool and volumes.",
      fr: "Cela décrit les questions à trancher, pas une architecture d'intégration précise : le bon schéma (synchronisation native, middleware, sur mesure) dépend de votre outil de facturation réel et de vos volumes.",
    },
    needParam: "integration",
    publishedAt: "2026-08-01",
  },
];

export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}
