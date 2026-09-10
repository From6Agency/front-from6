import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Layers, Sparkles } from "lucide-react";
import { getAdvisoryServices, getPortfolioCompanies } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { BookCallButton } from "@/components/BookCallButton";
import { FAQ } from "@/components/FAQ";
import { T } from "@/components/Bilingual";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { HeroGrowthChart } from "@/components/HeroGrowthChart";

const ICONS = [TrendingUp, Search, Layers, Sparkles];

export default async function Home() {
  const [services, companies] = await Promise.all([getAdvisoryServices(4), getPortfolioCompanies()]);

  return (
    <div>
      <section className="hero-section relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <FloatingOrbs tone="dark" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h1 className="text-balance mb-6 text-4xl font-medium leading-[1.12] tracking-tight md:text-5xl">
                  <T en="Field experience to help your company grow." fr="L'expérience du terrain pour faire grandir votre entreprise." />
                </h1>
                <p className="mb-8 max-w-lg text-lg text-hero-fg/75">
                  <T
                    en="From 6 connects companies to Darix's revenue expertise and supports founders through advisory and investment."
                    fr="From 6 relie les entreprises à l'expertise revenue de Darix et accompagne les fondateurs par le conseil et l'investissement."
                  />
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/diagnostic"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-hero-fg px-7 text-base font-medium text-hero-bg transition-colors hover:bg-hero-fg/85"
                  >
                    <T en="Structure my growth" fr="Structurer ma croissance" />
                  </Link>
                  <Link
                    href="/proposer-un-projet"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-hero-fg/40 bg-hero-fg/[0.06] px-7 text-base font-medium transition-colors hover:border-hero-fg/60 hover:bg-hero-fg/10"
                  >
                    <T en="Present my project" fr="Présenter mon projet" />
                  </Link>
                </div>
              </div>

              <div className="h-56 md:h-72 lg:h-full">
                <HeroGrowthChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative isolate overflow-hidden bg-background">
        <FloatingOrbs tone="light" />

        {/* Les deux parcours : un bloc de même poids pour l'entreprise et
            pour le fondateur, chacun avec son propre symptôme et son CTA. */}
        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-6">
            <RevealGroup className="grid gap-5 md:grid-cols-2">
              <RevealItem>
                <Link
                  href="/diagnostic"
                  className="group block h-full rounded-2xl border border-border bg-card p-8 card-shadow hover-lift md:p-10"
                >
                  <p className="kicker mb-3 text-muted-foreground">
                    <T en="For companies" fr="Pour les entreprises" />
                  </p>
                  <h2 className="mb-4 text-2xl font-medium md:text-3xl">
                    <T en="Are your systems slowing your growth?" fr="Vos systèmes freinent votre croissance ?" />
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    <T
                      en="Salesforce, CPQ, billing, integrations, data, or AI: we clarify what's blocking your teams and identify the next step with Darix."
                      fr="Salesforce, CPQ, facturation, intégrations, data ou IA : nous précisons ce qui bloque vos équipes et identifions la prochaine étape avec Darix."
                    />
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
                    <T en="Assess my need" fr="Évaluer mon besoin" /> <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </RevealItem>
              <RevealItem>
                <Link
                  href="/proposer-un-projet"
                  className="group block h-full rounded-2xl border border-border bg-card p-8 card-shadow hover-lift md:p-10"
                >
                  <p className="kicker mb-3 text-muted-foreground">
                    <T en="For founders" fr="Pour les fondateurs" />
                  </p>
                  <h2 className="mb-4 text-2xl font-medium md:text-3xl">
                    <T en="Looking for an investor who knows the field?" fr="Vous cherchez un investisseur qui connaît le terrain ?" />
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    <T
                      en="Present your company, its stage, and the support you're looking for: investment, advisory, or hands-on involvement."
                      fr="Présentez votre entreprise, son stade de développement et l'appui que vous recherchez : investissement, conseil ou implication opérationnelle."
                    />
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
                    <T en="Present my project" fr="Présenter mon projet" /> <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* Preuve concrète : trois entreprises réelles, statut réel, pas de
            paragraphe générique sur "l'expérience qui se construit". */}
        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker mb-3 text-muted-foreground">
                  <T en="Companies I'm involved in" fr="Les entreprises dans lesquelles je m'implique" />
                </p>
                <h2 className="text-3xl font-medium md:text-4xl">
                  <T en="Three companies, three forms of involvement." fr="Trois entreprises, trois formes d'implication." />
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
              >
                <T en="See the projects" fr="Voir les projets" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <RevealGroup className="grid gap-5 md:grid-cols-3">
              {companies.map((company) => (
                <RevealItem key={company.id}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-medium">{company.name}</h3>
                      {company.status && <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs">{company.status}</span>}
                    </div>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">
                      <T en={company.description} fr={company.description_fr || company.description} />
                    </p>
                    {company.website_url && (
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-muted-foreground"
                      >
                        <T en="Discover" fr="Découvrir" /> {company.name} →
                      </a>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Les enjeux revenue traités avec Darix : les six entrées existantes
            restent affichées, mais l'intro et le CTA renvoient vers Darix
            plutôt que de présenter From 6 comme exécutant lui-même. */}
        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="mb-16 text-center">
              <p className="kicker mb-3 text-muted-foreground">
                <T en="Revenue systems expertise" fr="Une expertise des systèmes revenue" />
              </p>
              <h2 className="mb-4 text-3xl font-medium md:text-4xl">
                <T en="Aligning sales, CRM, and billing in one system." fr="Aligner ventes, CRM et facturation dans un même système." />
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                <T
                  en="From the quote to the cash, your teams depend on shared processes and data. With Darix, the goal is to align sales operations, CRM, and finance so your tools actually support the business."
                  fr="De la vente à l'encaissement, vos équipes dépendent de processus et de données partagés. Avec Darix, l'enjeu est d'aligner les opérations commerciales, le CRM et la finance pour que les outils soutiennent réellement l'activité."
                />
              </p>
            </Reveal>
            <RevealGroup className="grid gap-5 md:grid-cols-2">
              {services.map((service, i) => (
                <RevealItem key={service.id}>
                  <ServiceCard
                    icon={ICONS[i] ?? Sparkles}
                    title={service.title}
                    titleFr={service.title_fr}
                    description={service.description}
                    descriptionFr={service.description_fr}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-12 text-center">
              <Link
                href="/advisory"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
              >
                <T en="Explore what we do with Darix" fr="Explorer l'accompagnement avec Darix" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Le fondateur : parcours vérifiable plutôt que formule abstraite. */}
        <section className="relative pb-[clamp(72px,9vw,140px)]">
          <Reveal className="mx-auto max-w-4xl px-6 text-center">
            <p className="kicker mb-3 text-muted-foreground">
              <T en="Behind From 6" fr="Derrière From 6" />
            </p>
            <h2 className="mb-6 text-3xl font-medium md:text-4xl">
              <T
                en="A path across finance, business systems, and entrepreneurship."
                fr="Un parcours entre finance, systèmes d'entreprise et entrepreneuriat."
              />
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              <T
                en="This experience helps me understand a leadership team's constraints, connect commercial decisions to their operational consequences, and support a company's next steps."
                fr="Cette expérience me sert à comprendre les contraintes d'un dirigeant, à relier les décisions commerciales à leurs conséquences opérationnelles et à accompagner les prochaines étapes d'une entreprise."
              />
            </p>
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
              >
                <T en="Discover my background" fr="Découvrir mon parcours" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="relative pb-[clamp(72px,9vw,140px)]">
          <Reveal className="mx-auto max-w-4xl px-6 text-center">
            <p className="kicker mb-3 text-muted-foreground">Insights</p>
            <h2 className="mb-6 text-3xl font-medium md:text-4xl">
              <T en="Media & Speaking" fr="Media & Conférences" />
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              <T
                en="Podcasts, interviews, and talks on Lead-to-Cash, RevOps, and scaling B2B SaaS."
                fr="Podcasts, interviews et conférences sur le Lead-to-Cash, le RevOps et la croissance des SaaS B2B."
              />
            </p>
            <Link
              href="/media"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
            >
              <T en="View media" fr="Voir le media" /> <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </section>

        <FAQ />
      </div>

      <section className="section-pad relative isolate overflow-hidden bg-hero-bg text-hero-fg">
        <FloatingOrbs tone="dark" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-medium md:text-4xl">
            <T en="Let's talk about what you want to build" fr="Parlons de ce que vous voulez construire" />
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-hero-fg/75">
            <T
              en="An operational need or an entrepreneurial project: pick the path that matches your situation."
              fr="Un besoin opérationnel ou un projet entrepreneurial : choisissez le parcours qui correspond à votre situation."
            />
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-hero-fg px-7 text-base font-medium text-hero-bg transition-colors hover:bg-hero-fg/85"
            >
              <T en="Choose my path" fr="Choisir mon parcours" />
            </Link>
            <BookCallButton size="lg" variant="outline" className="!border-hero-fg/40 !bg-hero-fg/[0.06] !text-hero-fg hover:!bg-hero-fg/10">
              <T en="Book a 30-min call" fr="Réserver un appel de 30 min" />
            </BookCallButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
