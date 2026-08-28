import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Our Projects — Portfolio",
  description: "The projects FROM 6 backs and builds alongside founders: RevOps tools, AI-powered workflows, and vertical SaaS.",
  alternates: { canonical: "/investments" },
};

const THESIS = [
  { title: "Revenue infrastructure & RevOps tools", desc: "Products that make go-to-market teams faster and cleaner." },
  { title: "AI-powered workflows", desc: "Automation that compounds, not features that demo well." },
  { title: "Vertical SaaS", desc: "Focused platforms owning a specific industry's lead-to-cash." },
];

const PARTNERSHIP = [
  { title: "Go-to-Market strategy & execution", desc: "Building efficient sales engines and scalable GTM motions." },
  { title: "Revenue platform architecture", desc: "Designing revenue infrastructure right, from day one." },
  { title: "Product positioning & roadmap", desc: "Aligning product strategy with real market needs." },
  { title: "Revenue Operations setup", desc: "CRM foundations, quote-to-cash, finance systems, and analytics." },
];

const ADDITIONAL = [
  "Strategic hiring (Sales, RevOps, Product)",
  "Investor & customer introductions",
  "Governance & board advisory",
  "Hands-on business systems architecture",
];

export default async function InvestmentsPage() {
  const companies = await getPortfolioCompanies();

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-4xl">
          <p className="mb-3 text-sm uppercase tracking-wide text-muted-foreground">
            <T en="Our Projects" fr="Nos Projets" />
          </p>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            <T en="We back the builders we'd want to work alongside" fr="Nous soutenons les fondateurs avec qui nous voulons travailler" />
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            <T
              en="FROM 6 invests in early-stage B2B SaaS founders solving hard revenue problems, and we roll up our sleeves. Beyond capital, you get a team of operators who have built the revenue infrastructure you're about to scale: RevOps, lead-to-cash, GTM systems, and AI-powered workflows."
              fr="FROM 6 investit dans des fondateurs B2B SaaS early-stage qui résolvent des problèmes de revenue difficiles, et nous mettons la main à la pâte. Au-delà du capital, vous avez une équipe d'opérateurs qui ont construit l'infrastructure revenue que vous vous apprêtez à scaler : RevOps, lead-to-cash, systèmes GTM et workflows IA."
            />
          </p>
        </div>

        <div className="mb-20 max-w-4xl">
          <h2 className="mb-4 text-2xl font-medium">
            <T en="What we invest in" fr="Ce que nous investissons" />
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            <T
              en="We look for early-stage B2B SaaS companies where our operating experience moves the needle, not just the cap table. The strongest fit:"
              fr="Nous cherchons des entreprises B2B SaaS early-stage où notre expérience opérationnelle fait vraiment la différence, pas seulement au cap table. Le meilleur fit :"
            />
          </p>
          <div className="mb-6 grid gap-5 md:grid-cols-3">
            {THESIS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                <h3 className="mb-2 font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
            <T en="We work hands-on with the founders we back. Where it counts:" fr="Nous travaillons hands-on avec les fondateurs que nous soutenons. Là où ça compte :" />
          </p>
          <div className="mb-10 grid gap-5 md:grid-cols-2">
            {PARTNERSHIP.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                <h3 className="mb-2 font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-lg font-medium">
            <T en="Additional support" fr="Accompagnement complémentaire" />
          </h3>
          <div className="rounded-2xl bg-muted/50 p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {ADDITIONAL.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span className="text-muted-foreground">{item}</span>
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

                  <p className="mb-4 text-sm text-muted-foreground">{company.description}</p>

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
            <T en="Building something in this space?" fr="Vous construisez quelque chose dans cet espace ?" />
          </h2>
          <p className="mb-6 text-muted-foreground">
            <T
              en="If you're an early-stage B2B SaaS founder working on revenue infrastructure, RevOps, or AI-driven GTM, we'd like to hear from you."
              fr="Si vous êtes fondateur B2B SaaS early-stage sur l'infrastructure revenue, le RevOps ou le GTM piloté par l'IA, nous voulons vous entendre."
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
