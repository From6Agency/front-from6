import type { Metadata } from "next";
import { ProjectForm } from "@/components/ProjectForm";
import { T } from "@/components/Bilingual";
import { ArrowLink, Page, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Present a project",
  description: "Present your company, its stage, and the support you're looking for: investment, advisory, or a hands-on partner.",
  alternates: { canonical: "/proposer-un-projet" },
};

export default function ProposerUnProjetPage() {
  return (
    <Page>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <PageHeader
          title={<T en="Let's see what we can build." fr="Voyons ce que nous pouvons construire." />}
          lead={
            <T
              en="No deck or revenue is required to start, and no sector is ruled out in advance. Three short steps: your project and stage, your activity and the support you need, then your contact details."
              fr="Aucun deck ni chiffre d'affaires n'est nécessaire pour commencer, et aucun secteur n'est écarté d'office. Trois étapes courtes : votre projet et son stade, votre activité et l'appui recherché, puis vos coordonnées."
            />
          }
          aside={
            <ArrowLink href="/investments">
              <T en="What I invest in" fr="Ce dans quoi j'investis" />
            </ArrowLink>
          }
        />
        <ProjectForm />
      </div>
    </Page>
  );
}
