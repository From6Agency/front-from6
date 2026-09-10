import type { Metadata } from "next";
import Link from "next/link";
import { Search, PencilRuler, Hammer, ArrowRight } from "lucide-react";
import { getAdvisoryServices } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Salesforce and revenue operations with Darix",
  description:
    "Structure your revenue operations: sales rules, CPQ, billing, integrations, and data, framed with From 6 and executed with Darix.",
  alternates: { canonical: "/advisory" },
};

const STEPS = [
  {
    icon: Search,
    title_en: "Diagnose",
    title_fr: "Diagnostiquer",
    desc_en: "We get inside your stack and workflows to find the real bottlenecks.",
    desc_fr: "Nous plongeons dans votre stack et vos workflows pour identifier les vrais points de blocage.",
  },
  {
    icon: PencilRuler,
    title_en: "Design",
    title_fr: "Concevoir",
    desc_en: "A pragmatic plan your team can actually execute.",
    desc_fr: "Un plan pragmatique que votre équipe peut réellement exécuter.",
  },
  {
    icon: Hammer,
    title_en: "Build",
    title_fr: "Construire",
    desc_en: "Hands-on implementation and architecture, not just recommendations.",
    desc_fr: "Implémentation et architecture concrètes, pas seulement des recommandations.",
  },
];

export default async function AdvisoryPage() {
  const services = await getAdvisoryServices();

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 kicker text-muted-foreground">
          <T en="For companies" fr="Pour les entreprises" />
        </p>
        <h1 className="mb-6 text-4xl font-medium md:text-5xl">
          <T en="Structure your revenue operations with Darix" fr="Structurer vos opérations revenue avec Darix" />
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <T
            en="Complex quotes, billing that's hard to keep reliable, double data entry, disconnected systems, data no one fully trusts: these are the symptoms we hear first, before any tool is discussed."
            fr="Devis complexes, facturation difficile à fiabiliser, doubles saisies, systèmes déconnectés, données peu exploitables : ce sont les symptômes qu'on entend en premier, avant même de parler d'outils."
          />
        </p>
        <p className="mb-16 max-w-2xl text-base leading-relaxed text-muted-foreground">
          <T
            en="From 6 frames the need with you: understand the situation, identify the teams and decisions involved, clarify priorities. The execution, CRM, CPQ, billing, integrations, data, or AI, is carried by Darix, the operational team Franck Berthelot co-founded."
            fr="From 6 cadre le besoin avec vous : comprendre la situation, identifier les équipes et décisions concernées, préciser les priorités. L'exécution (CRM, CPQ, facturation, intégrations, data ou IA) est portée par Darix, l'équipe opérationnelle cofondée par Franck Berthelot."
          />
        </p>

        <div className="space-y-4">
          {services.map((service, i) => (
            <div key={service.id} className="rounded-2xl border border-border bg-card p-8 card-shadow hover-lift">
              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">
                    <T en={service.title} fr={service.title_fr || service.title} />
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    <T en={service.description} fr={service.description_fr || service.description} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="mb-12 text-center">
            <p className="mb-3 kicker text-muted-foreground">
              <T en="How a request moves forward" fr="Comment se déroule une demande" />
            </p>
            <h2 className="text-3xl font-medium">
              <T en="From framing to execution with Darix" fr="Du cadrage à l'exécution avec Darix" />
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title_en} className="rounded-2xl border border-border bg-card p-8 card-shadow hover-lift">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-medium">
                  <T en={step.title_en} fr={step.title_fr} />
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <T en={step.desc_en} fr={step.desc_fr} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-2xl bg-muted/50 p-10 text-center md:p-14">
          <h2 className="mb-4 text-2xl font-medium md:text-3xl">
            <T en="Not sure where the revenue leaks are?" fr="Vous ne savez pas où se situent les fuites de revenus ?" />
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            <T
              en="Start with the diagnostic: a few questions on your priorities and context, then a first direction before any call."
              fr="Commencez par le diagnostic : quelques questions sur vos priorités et votre contexte, puis une première orientation avant tout appel."
            />
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/diagnostic"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <T en="Assess my need" fr="Évaluer mon besoin" />
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/darix"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-base font-medium hover:bg-accent"
            >
              <T en="Understand From 6 and Darix" fr="Comprendre le lien entre From 6 et Darix" />
            </Link>
          </div>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
}
