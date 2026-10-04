import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { DARIX_OFFERS, darixLink } from "@/lib/darix";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ArrowLink, Button, Page, PageHeader, Row, RowList, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Salesforce and revenue operations with Darix",
  description:
    "Structure your revenue operations: sales rules, CPQ, billing, integrations, and data, framed with From 6 and executed with Darix.",
  alternates: { canonical: "/advisory" },
};

const SYMPTOMS = [
  { en: "Quotes take days and still need a manual check.", fr: "Les devis prennent des jours et demandent encore une vérification manuelle." },
  { en: "Billing does not reconcile with what sales signed.", fr: "La facturation ne se réconcilie pas avec ce que le commerce a signé." },
  { en: "The same customer is typed twice, in the CRM and in the ERP.", fr: "Le même client est saisi deux fois, dans le CRM et dans l'ERP." },
  { en: "Reports exist but nobody trusts the numbers in them.", fr: "Les rapports existent mais personne ne fait confiance aux chiffres." },
  { en: "Service tickets and field work live in tools that never talk.", fr: "Les tickets de service et le terrain vivent dans des outils qui ne se parlent pas." },
];

const STEPS = [
  {
    title: { en: "You describe the problem", fr: "Vous décrivez le problème" },
    en: "In the diagnostic: three short steps, no specification needed.",
    fr: "Dans le diagnostic : trois étapes courtes, sans cahier des charges.",
  },
  {
    title: { en: "We frame the need together", fr: "Nous cadrons le besoin ensemble" },
    en: "Teams involved, decisions at stake, priorities, and a first direction.",
    fr: "Équipes concernées, décisions en jeu, priorités, et une première orientation.",
  },
  {
    title: { en: "Darix executes", fr: "Darix exécute" },
    en: "Audit, architecture, build, integrations, on Salesforce, by the architects who framed it.",
    fr: "Audit, architecture, construction, intégrations, sur Salesforce, par les architectes qui l'ont cadré.",
  },
];

export default function AdvisoryPage() {
  return (
    <Page>
      <PageHeader
        title={<T en="Structure your revenue operations with Darix" fr="Structurer vos opérations de revenus avec Darix" />}
        lead={
          <T
            en="From 6 frames the need. Darix, the operational team Franck Berthelot co-founded, executes on Salesforce. The detail of each offer lives on darix.io; this page tells you whether you are in the right place, and how to come in."
            fr="From 6 cadre le besoin. Darix, l'équipe opérationnelle cofondée par Franck Berthelot, exécute sur Salesforce. Le détail de chaque offre vit sur darix.io ; cette page vous dit si vous êtes au bon endroit, et comment venir."
          />
        }
      />

      <Section>
        <SectionHeader title={<T en="The symptoms we hear first" fr="Les symptômes qu'on entend en premier" />} />
        <RowList>
          {SYMPTOMS.map((s) => (
            <div key={s.en} className="py-4 text-[1.0625rem] leading-snug">
              <T en={s.en} fr={s.fr} />
            </div>
          ))}
        </RowList>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <T
            en="If one of these lines is yours, the tool is rarely the first problem. The rules, the handoffs and who owns each piece of data come first."
            fr="Si l'une de ces lignes est la vôtre, l'outil est rarement le premier problème. Les règles, les passages de relais et la propriété de chaque donnée viennent avant."
          />
        </p>
      </Section>

      <Section>
        <SectionHeader
          title={<T en="What Darix does, in six lines" fr="Ce que fait Darix, en six lignes" />}
          lead={<T en="Franck's own specialty in this list is Quote-to-Cash: CPQ, Revenue Cloud, billing." fr="La spécialité de Franck dans cette liste est le Quote-to-Cash : CPQ, Revenue Cloud, facturation." />}
        />
        <RowList>
          {DARIX_OFFERS.map((offer) => (
            <Row key={offer.key} href={darixLink(offer.path, "advisory")} external term={<T en={offer.label.en} fr={offer.label.fr} />}>
              <T en={offer.teaser.en} fr={offer.teaser.fr} />
            </Row>
          ))}
        </RowList>
      </Section>

      <Section>
        <SectionHeader title={<T en="How a request moves forward" fr="Comment une demande avance" />} />
        <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.en} className="border-t border-foreground pt-5">
              <span className="tabular-nums text-xs text-muted-foreground">{i + 1}</span>
              <h3 className="mt-3 text-lg">
                <T en={step.title.en} fr={step.title.fr} />
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <T en={step.en} fr={step.fr} />
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/diagnostic">
            <T en="Assess my need" fr="Évaluer mon besoin" />
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
          <ArrowLink href="/darix">
            <T en="The link between From 6 and Darix" fr="Le lien entre From 6 et Darix" />
          </ArrowLink>
        </div>
      </Section>

      <ClosingCTA />
    </Page>
  );
}
