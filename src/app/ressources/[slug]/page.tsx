import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { RESOURCES, getResource } from "@/lib/resources";
import { T } from "@/components/Bilingual";

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

  return (
    <div className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="mx-auto max-w-3xl">
        <p className="mb-3 kicker text-muted-foreground">
          <T en={resource.category.en} fr={resource.category.fr} />
        </p>
        <h1 className="mb-6 text-4xl font-medium md:text-5xl">
          <T en={resource.title.en} fr={resource.title.fr} />
        </h1>
        <p className="mb-2 text-sm text-muted-foreground">
          <T en="By Franck Berthelot" fr="Par Franck Berthelot" /> ·{" "}
          {new Date(resource.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </p>

        <p className="mb-10 mt-6 text-lg leading-relaxed">
          <T en={resource.answer.en} fr={resource.answer.fr} />
        </p>

        {resource.sections.map((section) => (
          <div key={section.heading.en} className="mb-8">
            <h2 className="mb-3 text-xl font-medium">
              <T en={section.heading.en} fr={section.heading.fr} />
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              <T en={section.body.en} fr={section.body.fr} />
            </p>
          </div>
        ))}

        <div className="mb-8 rounded-2xl border border-border bg-card p-7 card-shadow">
          <h2 className="mb-4 text-lg font-medium">
            <T en="What to prepare" fr="Éléments à préparer" />
          </h2>
          <ul className="space-y-2.5">
            {resource.checklist.en.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                <T en={item} fr={resource.checklist.fr[i] ?? item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-14 rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide">
            <T en="Limits of this guide" fr="Limites de la démarche" />
          </p>
          <T en={resource.limits.en} fr={resource.limits.fr} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center card-shadow">
          <h2 className="mb-3 text-xl font-medium">
            <T en="Assess my need with Darix" fr="Évaluer mon besoin avec Darix" />
          </h2>
          <Link
            href={`/diagnostic?need=${resource.needParam}`}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <T en="Start the diagnostic" fr="Démarrer le diagnostic" />
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/ressources" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
            <T en="All resources" fr="Toutes les ressources" />
          </Link>
        </div>
      </article>
    </div>
  );
}
