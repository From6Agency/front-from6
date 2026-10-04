import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { DARIX_OFFERS, darixLink } from "@/lib/darix";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Button, Page, PageHeader, Row, RowList, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "From 6 and Darix, how they connect",
  description: "Darix is the operational team co-founded by Franck Berthelot for Salesforce, CPQ, billing, and revenue system projects.",
  alternates: { canonical: "/darix" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "From 6", item: "https://from6agency.com/" },
    { "@type": "ListItem", position: 2, name: "Darix", item: "https://from6agency.com/darix" },
  ],
};

export default function DarixPage() {
  return (
    <Page width="4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHeader
        title={<T en="Darix, the team dedicated to your revenue systems." fr="Darix, l'équipe dédiée à vos systèmes de revenus." />}
        lead={
          <T
            en="From 6 is where a need first gets framed; Darix is where it gets built: Salesforce, Revenue Cloud, CPQ, billing, ERP integrations, data and AI."
            fr="From 6 est l'endroit où un besoin se cadre en premier ; Darix est l'endroit où il se construit : Salesforce, Revenue Cloud, CPQ, facturation, intégrations ERP, data et IA."
          />
        }
      />

      <Section>
        <h2 className="text-2xl md:text-[2rem]">
          <T en="When should you reach out to Darix?" fr="Quand solliciter Darix ?" />
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          <T
            en="Once a problem is reasonably clear: a Salesforce setup that no longer matches how the sales team works, a CPQ project to frame, billing that needs to reconcile with the CRM, or data quality that is starting to cost real time. The From 6 diagnostic exists precisely to help reach that point."
            fr="Dès qu'un problème est raisonnablement clair : un paramétrage Salesforce qui ne correspond plus à la façon dont l'équipe commerciale travaille, un projet CPQ à cadrer, une facturation à réconcilier avec le CRM, ou une qualité de données qui commence à coûter du temps réel. Le diagnostic From 6 sert justement à arriver à ce point."
          />
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl md:text-[2rem]">
          <T en="What is the first step?" fr="Quel est le premier pas ?" />
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          <T
            en="The From 6 diagnostic: a short set of questions on the need, the context and the timeline. It ends with a first direction before any call is booked."
            fr="Le diagnostic From 6 : quelques questions sur le besoin, le contexte et le calendrier. Il se termine par une première orientation, avant même de réserver un appel."
          />
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/diagnostic">
            <T en="Prepare my exchange with Darix" fr="Préparer mon échange avec Darix" />
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
          <Button href={darixLink("/", "darix-page")} external variant="outline">
            <T en="Visit darix.io" fr="Visiter darix.io" />
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeader title={<T en="The offer, as Darix publishes it" fr="L'offre, telle que Darix la publie" />} />
        <RowList>
          {DARIX_OFFERS.map((offer) => (
            <Row key={offer.key} href={darixLink(offer.path, "darix-page")} external term={<T en={offer.label.en} fr={offer.label.fr} />}>
              <T en={offer.teaser.en} fr={offer.teaser.fr} />
            </Row>
          ))}
        </RowList>
      </Section>

      <ClosingCTA />
    </Page>
  );
}
