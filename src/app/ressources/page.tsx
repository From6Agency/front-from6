import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/resources";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Better prepare your decisions",
  description: "Guides to frame a Lead-to-Cash, CPQ, or CRM and billing alignment project before your first call with Darix.",
  alternates: { canonical: "/ressources" },
};

export default function RessourcesPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 kicker text-muted-foreground">
          <T en="Resources" fr="Ressources" />
        </p>
        <h1 className="mb-6 text-4xl font-medium md:text-5xl">
          <T en="Better prepare your decisions." fr="Mieux préparer vos décisions." />
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <T
            en="Short, direct guides to frame a revenue systems project before your first conversation with Darix."
            fr="Des guides courts et directs pour cadrer un projet de systèmes revenue avant votre premier échange avec Darix."
          />
        </p>

        <div className="space-y-4">
          {RESOURCES.map((resource) => (
            <Link
              key={resource.slug}
              href={`/ressources/${resource.slug}`}
              className="group block rounded-2xl border border-border bg-card p-7 card-shadow hover-lift"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <T en={resource.category.en} fr={resource.category.fr} />
              </p>
              <h2 className="mb-2 text-xl font-medium">
                <T en={resource.title.en} fr={resource.title.fr} />
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">
                <T en={resource.excerpt.en} fr={resource.excerpt.fr} />
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
                <T en="Read the guide" fr="Lire le guide" /> <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Link href="/about" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
            <T en="Our experience" fr="Notre expérience" />
          </Link>
          <Link href="/media" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
            <T en="Hear Franck Berthelot on Lead-to-Cash" fr="Écouter Franck Berthelot sur le Lead-to-Cash" />
          </Link>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
}
