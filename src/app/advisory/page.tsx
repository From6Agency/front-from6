import type { Metadata } from "next";
import { Search, PencilRuler, Hammer } from "lucide-react";
import { getAdvisoryServices } from "@/lib/content";
import { BookCallButton } from "@/components/BookCallButton";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Advisory | Revenue & Business Architecture",
  description:
    "Senior advisory for B2B SaaS revenue: diagnosis, design, and architecture of CRM, CPQ, billing, and AI-powered workflows.",
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
        <p className="mb-3 kicker text-muted-foreground">Expertise</p>
        <h1 className="mb-6 text-4xl font-medium md:text-5xl">Advisory</h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <T
            en="Strategic advisory for B2B SaaS companies on revenue operations and business architecture. We help you see clearly where your revenue engine leaks, then rebuild it to scale."
            fr="Advisory stratégique pour les entreprises B2B SaaS sur les revenue operations et l'architecture business. Nous vous aidons à identifier clairement où votre moteur de revenus fuit, puis à le reconstruire pour scaler."
          />
        </p>
        <p className="mb-16 max-w-2xl text-base leading-relaxed text-muted-foreground">
          <T
            en="Most revenue problems aren't sales problems, they're systems problems. Disconnected tools, broken lead-to-cash workflows, data you can't trust. We bring 10+ years of Lead-to-Cash and Salesforce architecture to diagnose what's actually slowing you down, and the operator experience to fix it with your team."
            fr="La plupart des problèmes de revenus ne sont pas des problèmes commerciaux, ce sont des problèmes de systèmes : outils déconnectés, workflows lead-to-cash défaillants, données peu fiables. Nous apportons plus de 10 ans d'architecture Lead-to-Cash et Salesforce pour diagnostiquer ce qui vous ralentit réellement, et l'expérience terrain pour le corriger avec votre équipe."
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
            <p className="mb-3 kicker text-muted-foreground">Process</p>
            <h2 className="text-3xl font-medium">
              <T en="How we work" fr="Comment nous travaillons" />
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
              en="Start with an audit. In a focused engagement, we'll map your revenue stack and hand you a prioritized plan."
              fr="Commencez par un audit. Dans le cadre d'une mission ciblée, nous cartographions votre stack et vous remettons un plan priorisé."
            />
          </p>
          <BookCallButton size="lg">
            <T en="Book a call" fr="Réserver un appel" />
          </BookCallButton>
        </div>
      </div>
    </div>
  );
}
