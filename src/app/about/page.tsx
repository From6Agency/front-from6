import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ArrowLink, Page, PageHeader, Row, RowList, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Franck Berthelot | Background, Darix and From 6",
  description: "Franck Berthelot's path across finance, business systems, and entrepreneurship, and how From 6 and Darix connect.",
  alternates: { canonical: "/about" },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Franck Berthelot",
  jobTitle: "Entrepreneur & Investor",
  url: "https://from6agency.com/about",
  sameAs: ["https://www.linkedin.com/in/franckberthelot"],
  worksFor: { "@type": "Organization", name: "FROM 6 AGENCY", url: "https://from6agency.com" },
  knowsAbout: ["Revenue Operations", "Salesforce CPQ", "Lead-to-Cash", "B2B SaaS", "Early-stage investing"],
};

const PATH = [
  {
    term: { en: "Finance", fr: "Finance" },
    en: "Where I learned to read a company through its flows: what is sold, what is billed, what is actually collected.",
    fr: "Où j'ai appris à lire une entreprise par ses flux : ce qui est vendu, ce qui est facturé, ce qui est réellement encaissé.",
  },
  {
    term: { en: "Salesforce architecture", fr: "Architecture Salesforce" },
    en: "Lead-to-Cash platforms: CPQ, Revenue Cloud, billing, integrations. The systems that turn a signed deal into revenue, and the places where they break.",
    fr: "Les plateformes Lead-to-Cash : CPQ, Revenue Cloud, facturation, intégrations. Les systèmes qui transforment un contrat signé en revenus, et les endroits où ils cassent.",
  },
  {
    term: { en: "Entrepreneurship", fr: "Entrepreneuriat" },
    en: "Co-founder of Darix and 6WAY, investor in MicePro. The advice comes from someone who still ships and still carries risk.",
    fr: "Cofondateur de Darix et de 6WAY, investisseur dans MicePro. Le conseil vient de quelqu'un qui livre encore et porte encore du risque.",
  },
];

export default async function AboutPage() {
  const about = await getSiteContent("about");
  const bioEn = about.bio?.en ?? "";
  const bioFr = about.bio?.fr ?? "";
  const photoUrl = about.photo?.en || "/brand/franck-profile.png";

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
        <div className="md:sticky md:top-32">
          <div className="overflow-hidden">
            <Image src={photoUrl} alt="Franck Berthelot" width={640} height={800} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover" priority />
          </div>
          <div className="mt-4">
            <ArrowLink href="https://www.linkedin.com/in/franckberthelot" external>
              <T en="Franck Berthelot on LinkedIn" fr="Franck Berthelot sur LinkedIn" />
            </ArrowLink>
          </div>
        </div>

        <div>
          <PageHeader
            title="Franck Berthelot"
            lead={
              <T
                en="Founder of From 6, co-founder of Darix. One path, three chapters, and a habit of judging a company by how it actually runs."
                fr="Fondateur de From 6, cofondateur de Darix. Un parcours, trois chapitres, et l'habitude de juger une entreprise à la façon dont elle fonctionne vraiment."
              />
            }
          />

          <Section className="!mt-12">
            <SectionHeader title={<T en="Path" fr="Parcours" />} className="mb-4" />
            <RowList>
              {PATH.map((step) => (
                <Row key={step.en} term={<T en={step.term.en} fr={step.term.fr} />} className="md:grid-cols-[1fr_2fr]">
                  <T en={step.en} fr={step.fr} />
                </Row>
              ))}
            </RowList>
          </Section>

          {bioEn && (
            <Section className="!mt-12">
              <SectionHeader title={<T en="From 6, Darix and the companies" fr="From 6, Darix et les entreprises" />} className="mb-4" />
              <div className="space-y-4">
                {bioEn.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                    <T en={para} fr={bioFr.split("\n\n")[i] ?? para} />
                  </p>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      <ClosingCTA />
    </Page>
  );
}
