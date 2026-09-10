import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Darix, MicePro, 6WAY | From 6's projects",
  description: "The companies Franck Berthelot builds and invests in, with his real role and the current status of each project.",
  alternates: { canonical: "/portfolio" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "From 6", item: "https://from6agency.com/" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://from6agency.com/portfolio" },
  ],
};

export default async function PortfolioPage() {
  const companies = await getPortfolioCompanies();

  return (
    <div className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 kicker text-muted-foreground">
            <T en="Projects" fr="Projets" />
          </p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="Building and supporting." fr="Construire et accompagner." />
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            <T
              en="For each project below: what it does, who it serves, the problem it addresses, Franck's actual role, and its current status."
              fr="Pour chaque projet ci-dessous : ce qu'il fait, à qui il s'adresse, le problème traité, le rôle réel de Franck et le statut actuel."
            />
          </p>
        </div>

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
                    <h2 className="truncate font-medium">{company.name}</h2>
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
                      <T en="Franck's role" fr="Le rôle de Franck" />
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

        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center card-shadow">
          <h2 className="mb-3 text-2xl font-medium">
            <T en="Present your project to From 6" fr="Présenter votre projet à From 6" />
          </h2>
          <p className="mb-6 text-muted-foreground">
            <T
              en="If you're building in a related space and looking for investment, advisory, or a hands-on partner, we'd like to hear from you."
              fr="Si vous construisez dans un domaine proche et cherchez de l'investissement, du conseil ou un partenaire opérationnel, nous serions ravis d'échanger avec vous."
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
      </div>
    </div>
  );
}
