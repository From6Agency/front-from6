import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { BookCallButton } from "@/components/BookCallButton";
import { T } from "@/components/Bilingual";
import { DoorCard, Page, PageHeader, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Choose your path: a revenue-systems need for Darix, a project to present, or another request such as media or partnerships.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Page>
      <PageHeader
        title={<T en="What would you like to talk about?" fr="De quoi souhaitez-vous parler ?" />}
        lead={
          <T
            en="Two routes have their own form and get the fastest answer. Anything else, media, partnerships, a general question, goes through the form below."
            fr="Deux parcours ont leur propre formulaire et obtiennent la réponse la plus rapide. Tout le reste, média, partenariat, question générale, passe par le formulaire ci-dessous."
          />
        }
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <DoorCard
            href="/diagnostic"
            label={{ en: "For companies", fr: "Pour les entreprises" }}
            title={<T en="A revenue-systems need" fr="Un enjeu de systèmes revenue" />}
            cta={{ en: "Start the diagnostic", fr: "Démarrer le diagnostic" }}
          >
            <T en="Salesforce, CPQ, billing, integrations, data or AI: three short steps and a first direction." fr="Salesforce, CPQ, facturation, intégrations, data ou IA : trois étapes courtes et une première orientation." />
          </DoorCard>
          <DoorCard
            href="/proposer-un-projet"
            label={{ en: "For founders", fr: "Pour les fondateurs" }}
            title={<T en="A company to present" fr="Une entreprise à présenter" />}
            cta={{ en: "Present a project", fr: "Présenter un projet" }}
          >
            <T en="Your project, its stage and the support you need. No deck required." fr="Votre projet, son stade et l'appui recherché. Aucun deck requis." />
          </DoorCard>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <T en="Or book a 30-minute conversation directly:" fr="Ou réservez directement un échange de 30 minutes :" />
          <BookCallButton variant="outline" />
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={<T en="Another subject?" fr="Un autre sujet ?" />}
          lead={
            <T
              en="Podcast or talk, partnership, or a question that fits neither route. If the form fails, write to franck.berthelot@from6agency.com."
              fr="Podcast ou intervention, partenariat, ou une question qui ne rentre dans aucun des deux parcours. Si le formulaire échoue, écrivez à franck.berthelot@from6agency.com."
            />
          }
        />
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </Page>
  );
}
