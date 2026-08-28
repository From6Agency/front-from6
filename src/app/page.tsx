import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Layers, Sparkles } from "lucide-react";
import { getAdvisoryServices, getSiteContent } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { BookCallButton } from "@/components/BookCallButton";
import { FAQ } from "@/components/FAQ";
import { T } from "@/components/Bilingual";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { FloatingOrbs } from "@/components/FloatingOrbs";

const ICONS = [TrendingUp, Search, Layers, Sparkles];

export default async function Home() {
  const [services, hero] = await Promise.all([getAdvisoryServices(4), getSiteContent("hero")]);

  return (
    <div>
      <section className="hero-section relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <FloatingOrbs tone="dark" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-balance mb-8 text-5xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-[5.25rem]">
            A strategic partner for your transformation, from investment to field advisory
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-hero-fg/75 md:text-xl">
            {hero.subtitle ? (
              <T en={hero.subtitle.en} fr={hero.subtitle.fr} />
            ) : (
              "FROM 6 is the boutique of Franck Berthelot, a Lead-to-Cash architect."
            )}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <BookCallButton size="lg" variant="inverted">
              <T en="Book a call" fr="Réserver un appel" />
            </BookCallButton>
            <Link
              href="/advisory"
              className="inline-flex h-12 items-center justify-center rounded-full border border-hero-fg/40 bg-hero-fg/[0.06] px-7 text-base font-medium transition-colors hover:border-hero-fg/60 hover:bg-hero-fg/10"
            >
              <T en="See what we do" fr="Voir ce que nous faisons" />
            </Link>
          </div>
        </div>
      </section>

      {/* Un seul fond continu du hero jusqu'à la FAQ : les formes qui dérivent
          en arrière-plan créent la respiration visuelle entre sections,
          plutôt que des blocs de couleur alternés ou un quadrillage. */}
      <div className="relative isolate overflow-hidden bg-background">
        <FloatingOrbs tone="light" />

        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="mb-16 text-center">
              <p className="kicker mb-3 text-muted-foreground">Expertise</p>
              <h2 className="mb-4 text-3xl font-medium md:text-4xl">Advisory</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                <T
                  en="Diagnose, fix, and future-proof your revenue engine. From platform and process audits to RevOps strategy, data migrations, and GTM engineering, we work inside your stack, not just on a slide."
                  fr="Diagnostiquer, corriger et pérenniser votre moteur de revenus. Des audits plateforme et processus à la stratégie RevOps, en passant par les migrations de données et l'ingénierie GTM, nous intervenons directement dans votre stack, pas seulement sur une présentation."
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
                <T en="Explore advisory" fr="Explorer l'advisory" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative pb-[clamp(72px,9vw,140px)]">
          <Reveal className="mx-auto max-w-4xl px-6 text-center">
            <p className="kicker mb-3 text-muted-foreground">Portfolio</p>
            <h2 className="mb-6 text-3xl font-medium md:text-4xl">
              <T en="Our Projects" fr="Nos Projets" />
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              <T
                en="Early-stage B2B SaaS investments and ventures we've co-founded, all centered on revenue infrastructure, RevOps, and AI-powered workflows."
                fr="Investissements early-stage et ventures B2B SaaS que nous avons co-fondées, tous centrés sur les infrastructures de revenus, le RevOps et les workflows augmentés par l'IA."
              />
            </p>
            <div className="mt-10">
              <Link
                href="/investments"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
              >
                <T en="See the projects" fr="Voir les projets" /> <ArrowRight className="h-4 w-4" />
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
            <T en="Let's fix the way your revenue runs" fr="Remettons vos revenus sur les rails" />
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-hero-fg/75">
            <T
              en="Whether you need an advisor, an operator, or a partner who invests, the starting point is the same: a clear look at how your revenue engine works today."
              fr="Que vous ayez besoin d'un conseiller, d'un opérateur ou d'un partenaire qui investit, le point de départ reste le même : un diagnostic clair du fonctionnement actuel de votre moteur de revenus."
            />
          </p>
          <BookCallButton size="lg" variant="inverted">
            <T en="Book a 30-min call" fr="Réserver un appel de 30 min" />
          </BookCallButton>
        </Reveal>
      </section>
    </div>
  );
}
