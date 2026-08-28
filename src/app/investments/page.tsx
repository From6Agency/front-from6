import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Our Projects | Portfolio",
  description: "The projects FROM 6 backs and builds alongside founders: RevOps tools, AI-powered workflows, and vertical SaaS.",
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

export const revalidate = 60;

export default async function InvestmentsPage() {
  const companies = await getPortfolioCompanies();

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-4xl">
          <p className="mb-3 kicker text-muted-foreground">
            <T en="Our Projects" fr="Nos Projets" />
          </p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="We back the builders we'd want to work alongside" fr="Nous soutenons les fondateurs avec qui nous voulons travailler" />
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

        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-medium">Portfolio</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => {
              const isCofounder = company.role?.toLowerCase() === "co-founder";
              return (
                <div key={company.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {company.logo_url && (
                        <Image
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          width={40}
                          height={40}
                          className="shrink-0 rounded-lg bg-background object-contain p-1.5"
                        />
                      )}
                      <h3 className="truncate font-medium">{company.name}</h3>
                    </div>
                    {company.role && (
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${isCofounder ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                      >
                        {company.role}
                      </span>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">
                    <T en={company.description} fr={company.description_fr || company.description} />
                  </p>

                  {company.tags && company.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {company.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {(company.stage_year || company.status) && (
                    <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                      {company.stage_year && <span>{company.stage_year}</span>}
                      {company.stage_year && company.status && <span>·</span>}
                      {company.status && <span>{company.status}</span>}
                    </div>
                  )}

                  {company.my_role && (
                    <div className="mb-5 border-t border-border pt-4">
                      <p className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                        <T en="Our role" fr="Notre rôle" />
                      </p>
                      <p className="text-sm text-muted-foreground">{company.my_role}</p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    {company.project_video_url && (
                      <a
                        href={company.project_video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        <T en="Watch project video" fr="Voir la vidéo du projet" />
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {company.website_url && (
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium hover:text-muted-foreground"
                      >
                        <T en="Visit website" fr="Visiter le site" />
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <T en="More to come." fr="D'autres à venir." />
          </p>
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
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <T en="Send your deck" fr="Envoyez votre deck" />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
