import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ArrowLink, Button, Page, PageHeader, Row, RowList, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Investment and support for founders",
  description: "An operator's experience by your side: investment, advisory, and hands-on support for early-stage founders.",
  alternates: { canonical: "/investments" },
};

const THESIS = [
  {
    title: { en: "Technology and AI", fr: "Technologie et IA" },
    en: "My field of expertise: software, AI-powered products, revenue infrastructure and RevOps tools.",
    fr: "Mon domaine d'expertise : logiciels, produits augmentés par l'IA, infrastructure de revenus et outils RevOps.",
  },
  {
    title: { en: "Other sectors", fr: "Autres secteurs" },
    en: "Not limited to tech: a project from another sector can be presented when I can bring more than capital.",
    fr: "Pas limité à la tech : un projet d'un autre secteur peut être présenté quand je peux apporter plus que du capital.",
  },
];

const PARTNERSHIP = [
  { title: { en: "Go-to-market strategy and execution", fr: "Stratégie et exécution go-to-market" }, en: "Building efficient sales engines and scalable GTM motions.", fr: "Construire des moteurs commerciaux efficaces et des dispositifs GTM scalables." },
  { title: { en: "Revenue platform architecture", fr: "Architecture des plateformes de revenus" }, en: "Designing revenue infrastructure right, from day one.", fr: "Concevoir la bonne infrastructure de revenus dès le premier jour." },
  { title: { en: "Product positioning and roadmap", fr: "Positionnement produit et roadmap" }, en: "Aligning product strategy with real market needs.", fr: "Aligner la stratégie produit sur les besoins réels du marché." },
  { title: { en: "Revenue operations setup", fr: "Mise en place des Revenue Operations" }, en: "CRM foundations, quote-to-cash, finance systems and analytics.", fr: "Fondations CRM, quote-to-cash, systèmes financiers et analytics." },
  { title: { en: "Strategic hiring", fr: "Recrutement stratégique" }, en: "Sales, RevOps, Product.", fr: "Sales, RevOps, Produit." },
  { title: { en: "Introductions and governance", fr: "Mises en relation et gouvernance" }, en: "Investor and customer introductions, board advisory.", fr: "Mises en relation avec investisseurs et clients, advisory board." },
];

const QUESTIONS = [
  {
    q: { en: "Do I need revenue already?", fr: "Faut-il déjà du chiffre d'affaires ?" },
    en: "No. Pre-seed and seed projects are the usual stage. Traction helps the conversation but is not a condition to start it.",
    fr: "Non. Le pré-seed et le seed sont le stade habituel. La traction aide la conversation mais n'est pas une condition pour l'ouvrir.",
  },
  {
    q: { en: "Is a deck mandatory?", fr: "Un deck est-il obligatoire ?" },
    en: "No. The form asks for the problem you solve, your stage and the support you need. A deck or a link can be attached if you have one.",
    fr: "Non. Le formulaire demande le problème résolu, votre stade et l'appui recherché. Un deck ou un lien peut être joint si vous en avez un.",
  },
  {
    q: { en: "Can I get support without investment?", fr: "Peut-on avoir un accompagnement sans investissement ?" },
    en: "Yes. Advisory, operational involvement, partnership or co-founding are forms of involvement in their own right.",
    fr: "Oui. Le conseil, l'implication opérationnelle, le partenariat ou la cofondation sont des formes d'implication à part entière.",
  },
  {
    q: { en: "What should I prepare?", fr: "Que faut-il préparer ?" },
    en: "Three things: the problem you solve and for whom, where the company stands today, and the kind of help that would change the next twelve months.",
    fr: "Trois choses : le problème que vous résolvez et pour qui, où en est l'entreprise aujourd'hui, et l'aide qui changerait les douze prochains mois.",
  },
];

export default async function InvestmentsPage() {
  const investments = await getSiteContent("investments");
  const thesis = investments.thesis_content;

  return (
    <Page>
      <PageHeader
        title={<T en="An operator's experience by your side." fr="L'expérience d'un opérateur à vos côtés." />}
        lead={thesis ? <T en={thesis.en} fr={thesis.fr} /> : undefined}
      />

      <Section>
        <SectionHeader
          title={<T en="What I invest in" fr="Ce dans quoi j'investis" />}
          lead={
            <T
              en="I invest early, stay close, and only join projects where I can genuinely help build."
              fr="J'investis tôt, je reste proche, et je ne rejoins que des projets où je peux vraiment aider à construire."
            />
          }
        />
        <RowList>
          {THESIS.map((item) => (
            <Row key={item.en} term={<T en={item.title.en} fr={item.title.fr} />}>
              <T en={item.en} fr={item.fr} />
            </Row>
          ))}
        </RowList>
      </Section>

      <Section>
        <SectionHeader title={<T en="How I work alongside founders" fr="Comment je travaille avec les fondateurs" />} />
        <RowList>
          {PARTNERSHIP.map((item) => (
            <Row key={item.en} term={<T en={item.title.en} fr={item.title.fr} />}>
              <T en={item.en} fr={item.fr} />
            </Row>
          ))}
        </RowList>
        <div className="mt-6">
          <ArrowLink href="/portfolio">
            <T en="Where I am already involved: Darix, MicePro, 6WAY" fr="Où je suis déjà impliqué : Darix, MicePro, 6WAY" />
          </ArrowLink>
        </div>
      </Section>

      <Section>
        <SectionHeader title={<T en="Four questions founders ask" fr="Quatre questions que posent les fondateurs" />} />
        <RowList>
          {QUESTIONS.map((item) => (
            <Row key={item.en} term={<T en={item.q.en} fr={item.q.fr} />}>
              <T en={item.en} fr={item.fr} />
            </Row>
          ))}
        </RowList>
        <div className="mt-8">
          <Button href="/proposer-un-projet">
            <T en="Present my company" fr="Présenter mon entreprise" />
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <ClosingCTA />
    </Page>
  );
}
