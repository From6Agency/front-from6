import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { LinkedInVideo } from "@/components/LinkedInVideo";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, Page, PageHeader, Pill, Row, RowList } from "@/components/ui";

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

const ROLE_LABELS: Record<string, { en: string; fr: string }> = {
  "co-founder": { en: "Co-founder", fr: "Cofondateur" },
  investor: { en: "Investor", fr: "Investisseur" },
};
const STATUS_LABELS: Record<string, { en: string; fr: string }> = {
  active: { en: "Active", fr: "Actif" },
  beta: { en: "Beta", fr: "Bêta" },
  "in build": { en: "In build", fr: "En construction" },
};

export default async function PortfolioPage() {
  const companies = await getPortfolioCompanies();
  const ordered = [...companies].sort((a, b) => Number(b.name === "Darix") - Number(a.name === "Darix") || (a.display_order ?? 0) - (b.display_order ?? 0));

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHeader
        title={<T en="Building and supporting." fr="Construire et accompagner." />}
        lead={
          <T
            en="For each company: what it does, who it serves, Franck's actual role and its current status, as recorded in his own files."
            fr="Pour chaque entreprise : ce qu'elle fait, à qui elle s'adresse, le rôle réel de Franck et son statut actuel, tels qu'ils figurent dans ses propres fiches."
          />
        }
      />

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-20">
        {ordered.map((company) => {
          const role = company.role ? ROLE_LABELS[company.role.toLowerCase()] ?? { en: company.role, fr: company.role } : null;
          const status = company.status ? STATUS_LABELS[company.status.toLowerCase()] ?? { en: company.status, fr: company.status } : null;
          return (
            <section key={company.id} className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <h2 className="text-3xl">{company.name}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role && (
                    <Pill tone={role.en === "Co-founder" ? "solid" : "muted"}>
                      <T en={role.en} fr={role.fr} />
                    </Pill>
                  )}
                  {status && (
                    <Pill tone="outline">
                      <T en={status.en} fr={status.fr} />
                    </Pill>
                  )}
                </div>
                {company.stage_year && <p className="mt-3 text-sm text-muted-foreground">{company.stage_year}</p>}
              </div>
              <div>
                <RowList>
                  <Row term={<T en="What it does" fr="Ce qu'elle fait" />}>
                    <T en={company.description} fr={company.description_fr || company.description} />
                  </Row>
                  {company.my_role && <Row term={<T en="Franck's role" fr="Le rôle de Franck" />}>{company.my_role}</Row>}
                  {company.tags && company.tags.length > 0 && <Row term={<T en="Keywords" fr="Mots-clés" />}>{company.tags.join(", ")}</Row>}
                </RowList>
                <div className="mt-6 flex flex-wrap gap-3">
                  {company.website_url && (
                    <Button href={company.website_url} external>
                      <T en={`Visit ${company.name}`} fr={`Découvrir ${company.name}`} />
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </Button>
                  )}
                  {company.name === "Darix" && (
                    <Button href="/darix" variant="outline">
                      <T en="How From 6 and Darix connect" fr="Le lien entre From 6 et Darix" />
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </Button>
                  )}
                </div>
                {company.project_video_url && (
                  <div className="mt-6">
                    <LinkedInVideo url={company.project_video_url} title={`${company.name}, video`} />
                    <a href={company.project_video_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-signal underline-offset-4 hover:underline">
                      <T en="Open on LinkedIn" fr="Ouvrir sur LinkedIn" />
                    </a>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <ClosingCTA />
    </Page>
  );
}
