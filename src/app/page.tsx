import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { DARIX_OFFERS, darixLink } from "@/lib/darix";
import { T } from "@/components/Bilingual";
import { FAQ } from "@/components/FAQ";
import { BookCallButton } from "@/components/BookCallButton";
import { HeroDoors } from "@/components/home/HeroDoors";
import { ProofStrip } from "@/components/home/ProofStrip";
import { MobileDoorBar } from "@/components/home/MobileDoorBar";
import { ArrowLink, Button, Pill, Row, RowList, Section, SectionHeader } from "@/components/ui";

const delay = (ms: number) => ({ ["--delay" as string]: `${ms}ms` });

const EPISODE_URL =
  "https://smartlink.ausha.co/engrenages/episode-29-le-role-du-revops-dans-les-entrailles-de-salesforce-le-decryptage-de-la-brique-cpq-franck-berthelot";
const MASTERCLASS_URL = "https://www.youtube.com/watch?v=SWjLUN1Vofs";

const ROLE_LABELS: Record<string, { en: string; fr: string }> = {
  "co-founder": { en: "Co-founder", fr: "Cofondateur" },
  investor: { en: "Investor", fr: "Investisseur" },
};
const STATUS_LABELS: Record<string, { en: string; fr: string }> = {
  active: { en: "Active", fr: "Actif" },
  beta: { en: "Beta", fr: "Bêta" },
  "in build": { en: "In build", fr: "En construction" },
};

function label(map: Record<string, { en: string; fr: string }>, value: string | null) {
  if (!value) return null;
  return map[value.toLowerCase()] ?? { en: value, fr: value };
}

export default async function Home() {
  const companies = await getPortfolioCompanies();
  // Darix d'abord : la cofondation active est la preuve qui porte le reste.
  const ordered = [...companies].sort((a, b) => Number(b.name === "Darix") - Number(a.name === "Darix") || (a.display_order ?? 0) - (b.display_order ?? 0));

  return (
    <div className="pb-24 lg:pb-0">
      {/* Premier écran : le titre et sa phrase à gauche, l'illustration des deux
          voies à droite, puis les deux portes en bandes courtes. Fond Paper. */}
      <section className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-28">
        <HeroDoors
          intro={
            <>
              <h1 className="text-balance text-[2rem] leading-[0.98] anim-rise md:text-[3.5rem] lg:text-[4rem]">
                <T en="Field experience to help your company grow." fr="L'expérience du terrain pour faire grandir votre entreprise." />
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-snug text-muted-foreground anim-rise md:mt-6 md:text-lg" style={delay(120)}>
                <T
                  en="From 6 connects companies to Darix's revenue expertise and supports founders through advisory and investment."
                  fr="From 6 relie les entreprises à l'expertise revenus de Darix et accompagne les fondateurs par le conseil et l'investissement."
                />
              </p>
              <p className="tnum mt-3 hidden text-xs text-muted-foreground anim-rise md:block md:text-sm" style={delay(200)}>
                <T en="Franck Berthelot, co-founder of Darix and 6WAY, investor in MicePro." fr="Franck Berthelot, cofondateur de Darix et de 6WAY, investisseur dans MicePro." />
              </p>
            </>
          }
        />
      </section>

      {/* Preuve : les trois marques en une rangée qui glisse au scroll, puis
          les trois fiches côte à côte. */}
      <div className="mx-auto max-w-6xl px-6 pb-8 md:px-10">
        <Section id="entreprises" className="!mt-20 md:!mt-28">
          <SectionHeader
            title={<T en="Three companies, three forms of involvement." fr="Trois entreprises, trois formes d'implication." />}
            action={
              <ArrowLink href="/portfolio">
                <T en="See the projects" fr="Voir les projets" />
              </ArrowLink>
            }
          />
          <ProofStrip />
          <div className="mt-6 grid gap-10 border-t border-border pt-8 md:grid-cols-3 md:gap-10 md:pt-10">
            {ordered.map((company) => {
              const role = label(ROLE_LABELS, company.role);
              const status = label(STATUS_LABELS, company.status);
              return (
                <article key={company.id} className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl md:text-3xl">{company.name}</h3>
                    {status && (
                      <Pill tone={status.en === "Active" ? "solid" : "outline"}>
                        <T en={status.en} fr={status.fr} />
                      </Pill>
                    )}
                  </div>
                  {(role || company.stage_year) && (
                    <p className="tnum mt-2 text-sm text-muted-foreground">
                      {role && <T en={role.en} fr={role.fr} />}
                      {role && company.stage_year && ", "}
                      {company.stage_year}
                    </p>
                  )}
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    <T en={company.description} fr={company.description_fr || company.description} />
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {company.website_url && (
                      <Button href={company.website_url} external>
                        <T en={`Visit ${company.name}`} fr={`Découvrir ${company.name}`} />
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </Button>
                    )}
                    {company.name === "Darix" && (
                      <Button href="/darix" variant="outline">
                        <T en="How From 6 and Darix connect" fr="Le lien entre From 6 et Darix" />
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="darix">
          <SectionHeader
            title={<T en="Aligning sales, CRM and billing in one system." fr="Aligner ventes, CRM et facturation dans un même système." />}
            lead={
              <T
                en="From the quote to the cash, your teams depend on shared processes and data. From 6 frames the need; Darix, the team Franck co-founded, executes on Salesforce. Its current offer, in six lines:"
                fr="De la vente à l'encaissement, vos équipes dépendent de processus et de données partagés. From 6 cadre le besoin ; Darix, l'équipe que Franck a cofondée, exécute sur Salesforce. Son offre actuelle, en six lignes :"
              />
            }
          />
          <RowList>
            {DARIX_OFFERS.map((offer) => (
              <Row key={offer.key} href={darixLink(offer.path, "home")} external term={<T en={offer.label.en} fr={offer.label.fr} />}>
                <T en={offer.teaser.en} fr={offer.teaser.fr} />
              </Row>
            ))}
          </RowList>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/diagnostic">
              <T en="Assess my need" fr="Évaluer mon besoin" />
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Button>
            <ArrowLink href="/advisory">
              <T en="How a request moves from From 6 to Darix" fr="Comment une demande passe de From 6 à Darix" />
            </ArrowLink>
          </div>
        </Section>

        <Section id="parcours">
          <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:items-start md:gap-16">
            <Image
              src="/brand/franck-profile.png"
              alt="Franck Berthelot"
              width={640}
              height={800}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <div>
              <h2 className="text-balance text-2xl leading-tight md:text-[1.75rem]">
                <T en="A path across finance, business systems and entrepreneurship." fr="Un parcours entre finance, systèmes d'entreprise et entrepreneuriat." />
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                <T
                  en="Finance first, then Salesforce architecture on revenue platforms (Lead-to-Cash, CPQ, billing, integrations), then entrepreneurship. That order is why I read a company through its flows and its systems before its pitch, and why the advice comes with hands that still build."
                  fr="La finance d'abord, puis l'architecture Salesforce des plateformes revenus (Lead-to-Cash, CPQ, facturation, intégrations), puis l'entrepreneuriat. Cet ordre explique pourquoi je lis une entreprise par ses flux et ses systèmes avant son pitch, et pourquoi le conseil vient avec des mains qui construisent encore."
                />
              </p>
              <RowList className="tnum mt-8">
                <Row href={EPISODE_URL} external term="Podcast Engrenages, épisode 29">
                  <T en="The role of RevOps inside Salesforce, decoding the CPQ layer." fr="Le rôle du RevOps dans les entrailles de Salesforce, décryptage de la brique CPQ." />
                </Row>
                <Row href={MASTERCLASS_URL} external term={<T en="Masterclass, Lead-to-Cash on Salesforce" fr="Masterclass, Lead-to-Cash sur Salesforce" />}>
                  <T en="CPQ, billing and integrations, so revenue flows from first touch to cash." fr="CPQ, facturation et intégrations, pour que le revenu circule du premier contact au cash." />
                </Row>
                <Row href="/about" term={<T en="The full background" fr="Le parcours complet" />}>
                  <T en="From 6, Darix and the companies, in detail." fr="From 6, Darix et les entreprises, en détail." />
                </Row>
              </RowList>
            </div>
          </div>
        </Section>

        <Section id="faq" className="mb-16 md:mb-24">
          <SectionHeader title={<T en="Frequently asked questions" fr="Questions fréquentes" />} />
          <FAQ />
        </Section>
      </div>

      {/* La seule bande noire du site : l'appel de fin, les deux parcours. */}
      <section className="hero-section py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="text-balance text-3xl md:text-[2.5rem]">
                <T en="Let's talk about what you want to build" fr="Parlons de ce que vous voulez construire" />
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-hero-steel">
                <T
                  en="An operational need or an entrepreneurial project: pick the path that matches your situation."
                  fr="Un besoin opérationnel ou un projet entrepreneurial : choisissez le parcours qui correspond à votre situation."
                />
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href="/diagnostic" size="lg" variant="inverted">
                <T en="Companies: assess my need" fr="Entreprises : évaluer mon besoin" />
              </Button>
              <Button href="/proposer-un-projet" size="lg" variant="ghost">
                <T en="Founders: present my project" fr="Fondateurs : présenter mon projet" />
              </Button>
              <p className="tnum mt-1 flex flex-wrap items-center gap-x-2 text-sm text-hero-steel">
                <T en="Or a 30-minute call:" fr="Ou un appel de 30 minutes :" />
                <BookCallButton variant="ghost" className="!h-9 !px-4 !text-sm">
                  <T en="Book a slot" fr="Réserver un créneau" />
                </BookCallButton>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileDoorBar />
    </div>
  );
}
