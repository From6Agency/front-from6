import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Layers, Sparkles } from "lucide-react";
import { getAdvisoryServices, getSiteContent } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { BookCallButton } from "@/components/BookCallButton";
import { FAQ } from "@/components/FAQ";
import { T } from "@/components/Bilingual";

const ICONS = [TrendingUp, Search, Layers, Sparkles];

export default async function Home() {
  const [services, hero] = await Promise.all([getAdvisoryServices(4), getSiteContent("hero")]);

  return (
    <div>
      <section className="hero-section flex items-center justify-center py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-6 text-sm uppercase tracking-wide text-hero-fg/70 md:text-base">Advisory · Investments · Intelligence</p>
          <h1 className="mb-8 text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            A strategic partner for B2B SaaS revenue, from advice to investment
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl font-light text-hero-fg/80 md:text-2xl">
            {hero.subtitle ? (
              <T en={hero.subtitle.en} fr={hero.subtitle.fr} />
            ) : (
              "FROM 6 is the boutique of Franck Berthelot, a Lead-to-Cash architect."
            )}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <BookCallButton size="lg">
              <T en="Book a call" fr="Réserver un appel" />
            </BookCallButton>
            <Link
              href="/advisory"
              className="inline-flex h-12 items-center justify-center rounded-full border border-hero-fg/30 px-7 text-base font-medium hover:bg-hero-fg/10"
            >
              <T en="See what we do" fr="Voir ce que nous faisons" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm uppercase tracking-wide text-muted-foreground">Expertise</p>
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Advisory</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              <T
                en="Diagnose, fix, and future-proof your revenue engine. From platform and process audits to RevOps strategy, data migrations, and GTM engineering, we work inside your stack, not just on a slide."
                fr="Diagnostiquer, corriger et pérenniser votre moteur revenue. Des audits plateforme et processus à la stratégie RevOps, aux migrations de données et à l'ingénierie GTM, nous travaillons dans votre stack, pas seulement sur un slide."
              />
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                icon={ICONS[i] ?? Sparkles}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
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

      <section className="section-padding bg-muted/50">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm uppercase tracking-wide text-muted-foreground">Portfolio</p>
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            <T en="Our Projects" fr="Nos Projets" />
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            <T
              en="Early-stage B2B SaaS investments and ventures we've co-founded, all centered on revenue infrastructure, RevOps, and AI-powered workflows."
              fr="Investissements early-stage et ventures B2B SaaS co-fondées, centrés sur l'infrastructure revenue, le RevOps et les workflows IA."
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
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm uppercase tracking-wide text-muted-foreground">Insights</p>
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            <T en="Media & Speaking" fr="Media & Conférences" />
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            <T
              en="Podcasts, interviews, and talks on Lead-to-Cash, RevOps, and scaling B2B SaaS."
              fr="Podcasts, interviews et conférences sur le Lead-to-Cash, le RevOps et la croissance des B2B SaaS."
            />
          </p>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
          >
            <T en="View media" fr="Voir le media" /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FAQ />

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            <T en="Let's fix the way your revenue runs" fr="Réparons la façon dont votre revenue fonctionne" />
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            <T
              en="Whether you need an advisor, an operator, or a partner who invests, the starting point is the same: a clear look at how your revenue engine works today."
              fr="Que vous cherchiez un conseiller, un opérateur ou un partenaire qui investit, le point de départ est le même : un regard clair sur votre moteur revenue aujourd'hui."
            />
          </p>
          <BookCallButton size="lg">
            <T en="Book a 30-min call" fr="Réserver un appel de 30 min" />
          </BookCallButton>
        </div>
      </section>
    </div>
  );
}
