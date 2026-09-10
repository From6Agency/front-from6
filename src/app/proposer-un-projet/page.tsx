import type { Metadata } from "next";
import Link from "next/link";
import { ProjectForm } from "@/components/ProjectForm";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Present a project",
  description: "Present your company, its stage, and the support you're looking for: investment, advisory, or a hands-on partner.",
  alternates: { canonical: "/proposer-un-projet" },
};

export default function ProposerUnProjetPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-3 kicker text-muted-foreground">
            <T en="For founders" fr="Pour les fondateurs" />
          </p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="Let's see what we can build." fr="Voyons ce que nous pouvons construire." />
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            <T
              en="No deck or revenue is required to start, and there's no sector to rule out in advance. Three short steps: your project and stage, your activity and the support you need, then your contact details."
              fr="Aucun deck ni chiffre d'affaires n'est nécessaire pour commencer, et aucun secteur n'est écarté d'office. Trois étapes courtes : votre projet et son stade, votre activité et l'appui recherché, puis vos coordonnées."
            />
          </p>
          <Link href="/investments" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
            <T en="Our approach" fr="Notre approche" />
          </Link>
        </div>
        <ProjectForm />
      </div>
    </div>
  );
}
