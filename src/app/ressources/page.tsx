import type { Metadata } from "next";
import { RESOURCES } from "@/lib/resources";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ArrowLink, Page, PageHeader, Row, RowList, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Better prepare your decisions",
  description: "Guides to frame a Lead-to-Cash, CPQ, or CRM and billing alignment project before your first call with Darix.",
  alternates: { canonical: "/ressources" },
};

export default function RessourcesPage() {
  return (
    <Page>
      <PageHeader
        title={<T en="Better prepare your decisions." fr="Mieux préparer vos décisions." />}
        lead={
          <T
            en="Short, direct guides to frame a revenue-systems project before your first conversation with Darix. Each one starts with the answer."
            fr="Des guides courts et directs pour cadrer un projet de systèmes revenue avant votre premier échange avec Darix. Chacun commence par la réponse."
          />
        }
      />

      <Section>
        <RowList>
          {RESOURCES.map((resource) => (
            <Row key={resource.slug} href={`/ressources/${resource.slug}`} term={<span className="text-lg transition-colors group-hover:text-signal"><T en={resource.title.en} fr={resource.title.fr} /></span>}>
              <T en={resource.excerpt.en} fr={resource.excerpt.fr} />
            </Row>
          ))}
        </RowList>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/media">
            <T en="Hear Franck Berthelot on Lead-to-Cash" fr="Écouter Franck Berthelot sur le Lead-to-Cash" />
          </ArrowLink>
          <ArrowLink href="/about">
            <T en="Background" fr="Parcours" />
          </ArrowLink>
        </div>
      </Section>

      <ClosingCTA />
    </Page>
  );
}
