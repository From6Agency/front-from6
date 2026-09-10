import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Investment and support for founders",
  description: "An operator's experience by your side: investment, advisory, and hands-on support for early-stage B2B SaaS founders.",
  alternates: { canonical: "/investments" },
};

const THESIS = [
  {
    title_en: "Revenue infrastructure & RevOps tools",
    title_fr: "Infrastructure de revenus & outils RevOps",
    desc_en: "Products that make go-to-market teams faster and cleaner.",
    desc_fr: "Des produits qui rendent les équipes go-to-market plus rapides et plus efficaces.",
  },
  {
    title_en: "AI-powered workflows",
    title_fr: "Workflows augmentés par l'IA",
    desc_en: "Automation that compounds, not features that demo well.",
    desc_fr: "Une automatisation qui s'accumule dans le temps, pas des fonctionnalités qui brillent en démo.",
  },
  {
    title_en: "Vertical SaaS",
    title_fr: "SaaS vertical",
    desc_en: "Focused platforms owning a specific industry's lead-to-cash.",
    desc_fr: "Des plateformes focalisées qui maîtrisent le lead-to-cash d'un secteur précis.",
  },
];

const PARTNERSHIP = [
  {
    title_en: "Go-to-Market strategy & execution",
    title_fr: "Stratégie et exécution Go-to-Market",
    desc_en: "Building efficient sales engines and scalable GTM motions.",
    desc_fr: "Construire des moteurs commerciaux efficaces et des dispositifs GTM scalables.",
  },
  {
    title_en: "Revenue platform architecture",
    title_fr: "Architecture des plateformes de revenus",
    desc_en: "Designing revenue infrastructure right, from day one.",
    desc_fr: "Concevoir la bonne infrastructure de revenus dès le premier jour.",
  },
  {
    title_en: "Product positioning & roadmap",
    title_fr: "Positionnement produit & roadmap",
    desc_en: "Aligning product strategy with real market needs.",
    desc_fr: "Aligner la stratégie produit sur les besoins réels du marché.",
  },
  {
    title_en: "Revenue Operations setup",
    title_fr: "Mise en place des Revenue Operations",
    desc_en: "CRM foundations, quote-to-cash, finance systems, and analytics.",
    desc_fr: "Fondations CRM, quote-to-cash, systèmes financiers et analytics.",
  },
];

const ADDITIONAL = [
  { en: "Strategic hiring (Sales, RevOps, Product)", fr: "Recrutement stratégique (Sales, RevOps, Produit)" },
  { en: "Investor & customer introductions", fr: "Mises en relation avec investisseurs et clients" },
  { en: "Governance & board advisory", fr: "Gouvernance et advisory board" },
  { en: "Hands-on business systems architecture", fr: "Architecture des systèmes business, de façon concrète" },
];

export default function InvestmentsPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-4xl">
          <p className="mb-3 kicker text-muted-foreground">
            <T en="For founders" fr="Pour les fondateurs" />
          </p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="An operator's experience by your side." fr="L'expérience d'un opérateur à vos côtés." />
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            <T
              en="FROM 6 invests in early-stage B2B SaaS founders solving hard revenue problems, and we roll up our sleeves. Beyond capital, you get a team of operators who have built the revenue infrastructure you're about to scale: RevOps, lead-to-cash, GTM systems, and AI-powered workflows."
              fr="FROM 6 investit dans des fondateurs B2B SaaS early-stage qui résolvent des problèmes de revenus complexes, et nous mettons la main à la pâte. Au-delà du capital, vous bénéficiez d'une équipe d'opérateurs qui a construit l'infrastructure de revenus que vous vous apprêtez à scaler : RevOps, lead-to-cash, systèmes GTM et workflows augmentés par l'IA."
            />
          </p>
        </div>

        <div className="mb-20 max-w-4xl">
          <h2 className="mb-4 text-2xl font-medium">
            <T en="What we invest in" fr="Nos domaines d'investissement" />
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            <T
              en="We look for early-stage B2B SaaS companies where our operating experience moves the needle, not just the cap table. The strongest fit:"
              fr="Nous recherchons des entreprises B2B SaaS early-stage où notre expérience opérationnelle fait vraiment la différence, pas seulement au cap table. Le profil que nous recherchons :"
            />
          </p>
          <div className="mb-6 grid gap-5 md:grid-cols-3">
            {THESIS.map((item) => (
              <div key={item.title_en} className="rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                <h3 className="mb-2 font-medium">
                  <T en={item.title_en} fr={item.title_fr} />
                </h3>
                <p className="text-sm text-muted-foreground">
                  <T en={item.desc_en} fr={item.desc_fr} />
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            <T
              en="We invest early, stay close, and only join projects where we can genuinely help build."
              fr="Nous investissons tôt, restons proches, et ne rejoignons que des projets où nous pouvons vraiment aider à construire."
            />
          </p>
        </div>

        <div className="mb-20 max-w-4xl">
          <h2 className="mb-4 text-2xl font-medium">
            <T en="More than a check" fr="Plus qu'un chèque" />
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            <T en="We work hands-on with the founders we back. Where it counts:" fr="Nous nous impliquons concrètement aux côtés des fondateurs que nous soutenons, là où ça compte :" />
          </p>
          <div className="mb-10 grid gap-5 md:grid-cols-2">
            {PARTNERSHIP.map((item) => (
              <div key={item.title_en} className="rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                <h3 className="mb-2 font-medium">
                  <T en={item.title_en} fr={item.title_fr} />
                </h3>
                <p className="text-sm text-muted-foreground">
                  <T en={item.desc_en} fr={item.desc_fr} />
                </p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-lg font-medium">
            <T en="Additional support" fr="Accompagnement complémentaire" />
          </h3>
          <div className="rounded-2xl bg-muted/50 p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {ADDITIONAL.map((item) => (
                <li key={item.en} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span className="text-muted-foreground">
                    <T en={item.en} fr={item.fr} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-20 flex max-w-4xl items-center justify-between gap-4 rounded-2xl border border-border bg-card p-8 card-shadow">
          <div>
            <h2 className="mb-1 text-xl font-medium">
              <T en="See who I'm already involved with" fr="Voir dans quoi je m'implique déjà" />
            </h2>
            <p className="text-sm text-muted-foreground">
              <T en="Darix, MicePro, and 6WAY, with real status and role." fr="Darix, MicePro et 6WAY, avec statut et rôle réels." />
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
          >
            <T en="View portfolio" fr="Voir le portfolio" />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center card-shadow">
          <h2 className="mb-3 text-2xl font-medium">
            <T en="Building something in this space?" fr="Vous construisez dans ce domaine ?" />
          </h2>
          <p className="mb-6 text-muted-foreground">
            <T
              en="If you're an early-stage B2B SaaS founder working on revenue infrastructure, RevOps, or AI-driven GTM, we'd like to hear from you."
              fr="Si vous êtes fondateur B2B SaaS early-stage et que vous travaillez sur l'infrastructure de revenus, le RevOps ou un GTM piloté par l'IA, nous serions ravis d'échanger avec vous."
            />
          </p>
          <Link
            href="/proposer-un-projet"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <T en="Present my project" fr="Présenter mon projet" />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
}
