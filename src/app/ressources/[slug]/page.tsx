import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { RESOURCES, getResource } from "@/lib/resources";
import { T } from "@/components/Bilingual";
import { ArrowLink, Button, Page, PageHeader, Section } from "@/components/ui";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: resource.title.en,
    description: resource.excerpt.en,
    alternates: { canonical: `/ressources/${resource.slug}` },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title.en,
    description: resource.excerpt.en,
    datePublished: resource.publishedAt,
    author: { "@type": "Person", name: "Franck Berthelot" },
    publisher: { "@type": "Organization", name: "FROM 6 AGENCY" },
    mainEntityOfPage: `https://from6agency.com/ressources/${resource.slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "From 6", item: "https://from6agency.com/" },
      { "@type": "ListItem", position: 2, name: "Ressources", item: "https://from6agency.com/ressources" },
      { "@type": "ListItem", position: 3, name: resource.title.en, item: `https://from6agency.com/ressources/${resource.slug}` },
    ],
  };

  const date = new Date(resource.publishedAt);
  const dateEn = date.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  const dateFr = date.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });

  return (
    <Page width="3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article>
        <p className="mb-5 text-sm text-muted-foreground">
          <T en="Guide" fr="Guide" /> · Franck Berthelot · <T en={dateEn} fr={dateFr} />
        </p>
        <PageHeader title={<T en={resource.title.en} fr={resource.title.fr} />} />

        <p className="mt-8 border-l-2 border-foreground pl-5 text-lg leading-relaxed md:text-xl">
          <T en={resource.answer.en} fr={resource.answer.fr} />
        </p>

        {resource.sections.map((section) => (
          <Section key={section.heading.en} className="!mt-12">
            <h2 className="text-2xl">
              <T en={section.heading.en} fr={section.heading.fr} />
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              <T en={section.body.en} fr={section.body.fr} />
            </p>
          </Section>
        ))}

        <Section className="!mt-12">
          <h2 className="text-2xl">
            <T en="What to prepare" fr="Éléments à préparer" />
          </h2>
          <ol className="mt-4 divide-y divide-border border-y border-border">
            {resource.checklist.en.map((item, i) => (
              <li key={item} className="flex gap-5 py-3.5 text-[0.9375rem] leading-relaxed">
                <span className="w-5 shrink-0 tabular-nums text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <T en={item} fr={resource.checklist.fr[i] ?? item} />
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section className="!mt-12">
          <h2 className="text-2xl">
            <T en="Limits of this guide" fr="Limites de la démarche" />
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <T en={resource.limits.en} fr={resource.limits.fr} />
          </p>
        </Section>

        <div className="mt-12 flex flex-wrap items-center gap-6 rounded-[28px] bg-muted/60 p-6 md:p-8">
          <Button href={`/diagnostic?need=${resource.needParam}`}>
            <T en="Assess my need with Darix" fr="Évaluer mon besoin avec Darix" />
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
          <ArrowLink href="/ressources">
            <T en="All guides" fr="Tous les guides" />
          </ArrowLink>
        </div>
      </article>
    </Page>
  );
}
