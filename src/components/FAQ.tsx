import { Plus } from "lucide-react";
import { T } from "@/components/Bilingual";

const FAQS: Array<{ q_en: string; q_fr: string; a_en: string; a_fr: string }> = [
  {
    q_en: "What is the link between From 6 and Darix?",
    q_fr: "Quel est le lien entre From 6 et Darix ?",
    a_en: "From 6 carries Franck Berthelot's entrepreneurial and investment activity. Darix, which he co-founded, handles the operational projects tied to revenue systems: Salesforce, CPQ, billing, and integrations.",
    a_fr: "From 6 porte les activités entrepreneuriales et d'investissement de Franck Berthelot. Darix, qu'il a cofondé, intervient sur les projets opérationnels liés aux systèmes revenue : Salesforce, CPQ, facturation et intégrations.",
  },
  {
    q_en: "What kind of projects can I present to From 6?",
    q_fr: "Quels projets peut-on présenter à From 6 ?",
    a_en: "B2B SaaS, vertical software, and applied AI projects are the main areas of interest. A project from another sector can also be presented by explaining its activity and the kind of support it needs.",
    a_fr: "Les SaaS B2B, logiciels métiers et projets d'IA appliquée font partie des domaines d'intérêt. Un projet d'un autre secteur peut aussi être présenté en expliquant son activité et l'appui recherché.",
  },
  {
    q_en: "Do I need a finished specification to reach out?",
    q_fr: "Faut-il déjà avoir un cahier des charges ?",
    a_en: "No. A concrete problem, the tools involved, and a rough timeline are enough to start framing the need.",
    a_fr: "Non. Un problème concret, les outils concernés et un calendrier permettent de commencer à cadrer le besoin.",
  },
  {
    q_en: "Is the online diagnostic an audit?",
    q_fr: "Le diagnostic en ligne est-il un audit ?",
    a_en: "It gives a first direction based on the answers provided. An actual audit requires further analysis with the teams involved.",
    a_fr: "Il apporte une première orientation à partir des réponses fournies. Un audit nécessite une analyse complémentaire avec les équipes concernées.",
  },
  {
    q_en: "Can I propose a speaking engagement or a podcast?",
    q_fr: "Peut-on proposer une intervention ou un podcast ?",
    a_en: "Yes. Relevant topics include revenue systems, Salesforce, SaaS, and entrepreneurship. Requests go through the Contact page.",
    a_fr: "Oui. Les sujets peuvent notamment concerner les systèmes revenue, Salesforce, les SaaS et l'entrepreneuriat. La demande passe par la page Contact.",
  },
];

/* Questions et réponses natives (details/summary) : chaque réponse est dans
   le HTML dès le chargement, lisible par les moteurs de recherche et de réponse. */
export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q_en,
      acceptedAnswer: { "@type": "Answer", text: f.a_en },
    })),
  };

  return (
    <div className="divide-y divide-border border-y border-border">
      {FAQS.map((f) => (
        <details key={f.q_en} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium leading-snug">
            <T en={f.q_en} fr={f.q_fr} />
            <Plus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" strokeWidth={2} aria-hidden="true" />
          </summary>
          <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <T en={f.a_en} fr={f.a_fr} />
          </p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
