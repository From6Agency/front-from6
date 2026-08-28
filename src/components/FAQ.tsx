import { T } from "@/components/Bilingual";

const FAQS: Array<{ q_en: string; q_fr: string; a_en: string; a_fr: string }> = [
  {
    q_en: "What is a Lead-to-Cash architect?",
    q_fr: "Qu'est-ce qu'un architecte Lead-to-Cash ?",
    a_en: "A Lead-to-Cash architect designs and connects the systems that turn a lead into recognized revenue: CRM, CPQ, contracts, billing, and the integrations between them. Franck Berthelot, founder of FROM 6, has spent 10+ years building this expertise on Salesforce-centered revenue platforms.",
    a_fr: "Un architecte Lead-to-Cash conçoit et connecte les systèmes qui transforment un lead en revenue reconnu : CRM, CPQ, contrats, facturation, et les intégrations entre eux. Franck Berthelot, fondateur de FROM 6, a construit cette expertise sur plus de 10 ans autour des plateformes revenue Salesforce.",
  },
  {
    q_en: "Who does FROM 6 AGENCY work with?",
    q_fr: "Avec qui travaille FROM 6 AGENCY ?",
    a_en: "High-growth B2B SaaS teams and early-stage founders who need to strengthen the systems behind revenue: RevOps, CRM, CPQ, billing, and AI-powered workflows.",
    a_fr: "Des équipes B2B SaaS en forte croissance et des fondateurs en amorçage qui doivent renforcer les systèmes qui portent leur revenue : RevOps, CRM, CPQ, facturation et workflows assistés par l'IA.",
  },
  {
    q_en: "What does a Platform Audit include?",
    q_fr: "Que comprend un Platform Audit ?",
    a_en: "A diagnostic of your Marketing, CRM (Salesforce), CPQ, and billing setup and integrations, resulting in a clear map of your stack and where it's costing you revenue.",
    a_fr: "Un diagnostic de votre setup Marketing, CRM (Salesforce), CPQ, facturation et intégrations, qui aboutit à une cartographie claire de votre stack et des endroits où elle vous coûte du revenue.",
  },
  {
    q_en: "Does FROM 6 AGENCY also invest, not just advise?",
    q_fr: "FROM 6 AGENCY investit-il aussi, ou seulement du conseil ?",
    a_en: "Both. Beyond advisory, FROM 6 invests in early-stage B2B SaaS startups building revenue infrastructure, RevOps tools, AI-powered workflows, and vertical SaaS platforms, typically €10-50K per check, with hands-on operational support alongside the capital.",
    a_fr: "Les deux. Au-delà de l'advisory, FROM 6 investit dans des startups B2B SaaS early-stage qui construisent de l'infrastructure revenue, des outils RevOps, des workflows IA ou des SaaS verticaux, en général entre 10 et 50K€ par ticket, avec un accompagnement opérationnel en plus du capital.",
  },
  {
    q_en: "How do I start working with FROM 6 AGENCY?",
    q_fr: "Comment démarrer une collaboration avec FROM 6 AGENCY ?",
    a_en: "Book a 30-minute call to walk through where your revenue engine stands today. Most engagements start with a focused Platform or Process Audit before moving into advisory or hands-on execution.",
    a_fr: "Réservez un appel de 30 minutes pour faire le point sur l'état actuel de votre moteur revenue. La plupart des collaborations démarrent par un Platform ou Process Audit ciblé, avant de passer à l'advisory ou à l'exécution opérationnelle.",
  },
];

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
    <section className="section-pad relative">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14 text-center">
          <p className="kicker mb-3 text-muted-foreground">FAQ</p>
          <h2 className="text-3xl font-medium md:text-4xl">
            <T en="Frequently asked questions" fr="Questions fréquentes" />
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q_en} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="text-lg font-medium">
                  <T en={f.q_en} fr={f.q_fr} />
                </span>
                <span className="mt-1 shrink-0 font-mono text-xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                <T en={f.a_en} fr={f.a_fr} />
              </p>
            </details>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
