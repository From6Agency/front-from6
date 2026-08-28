import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Layers, Sparkles, Headphones, Linkedin, Handshake } from "lucide-react";
import { getAdvisoryServices, getSiteContent } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { BookCallButton } from "@/components/BookCallButton";
import { FAQ } from "@/components/FAQ";
import { T } from "@/components/Bilingual";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const ICONS = [TrendingUp, Search, Layers, Sparkles];

const PROOF = [
  { icon: Handshake, en: "Salesforce-native Lead-to-Cash, 10+ years", fr: "Lead-to-Cash Salesforce-native, 10+ ans" },
  { icon: Headphones, en: "Featured on Engrenages & CRM Dojo", fr: "Invité sur Engrenages & CRM Dojo" },
  { icon: Linkedin, en: "6WAY & Darix, co-founded and operated", fr: "6WAY & Darix, co-fondées et opérées" },
];

export default async function Home() {
  const [services, hero] = await Promise.all([getAdvisoryServices(4), getSiteContent("hero")]);

  return (
    <div>
      <section className="hero-section relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="blueprint-grid absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-balance mb-8 text-5xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-[5.25rem]">
            A strategic partner for <em className="not-italic underline decoration-1 underline-offset-4">B2B SaaS revenue</em>, from advice to investment
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
              className="inline-flex h-12 items-center justify-center rounded-full border border-hero-fg/25 px-7 text-base font-medium transition-colors hover:bg-hero-fg/10"
            >
              <T en="See what we do" fr="Voir ce que nous faisons" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-hero-fg/10 bg-hero-bg/60 backdrop-blur">
          <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-hero-fg/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PROOF.map((item) => (
              <div key={item.en} className="flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-hero-fg/70">
                <item.icon className="h-3.5 w-3.5 shrink-0 text-hero-fg" />
                <T en={item.en} fr={item.fr} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-16 text-center">
            <p className="kicker mb-3 text-muted-foreground">Expertise</p>
            <h2 className="mb-4 text-3xl font-medium md:text-4xl">Advisory</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              <T
                en="Diagnose, fix, and future-proof your revenue engine. From platform and process audits to RevOps strategy, data migrations, and GTM engineering, we work inside your stack, not just on a slide."
                fr="Diagnostiquer, corriger et pérenniser votre moteur revenue. Des audits plateforme et processus à la stratégie RevOps, aux migrations de données et à l'ingénierie GTM, nous travaillons dans votre stack, pas seulement sur un slide."
              />
            </p>
          </Reveal>
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            {services.map((service, i) => (
              <RevealItem key={service.id}>
                <ServiceCard icon={ICONS[i] ?? Sparkles} title={service.title} description={service.description} />
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

      <section className="section-pad bg-muted/40">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <p className="kicker mb-3 text-muted-foreground">Portfolio</p>
          <h2 className="mb-6 text-3xl font-medium md:text-4xl">
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
        </Reveal>
      </section>

      <section className="section-pad bg-background">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <p className="kicker mb-3 text-muted-foreground">Insights</p>
          <h2 className="mb-6 text-3xl font-medium md:text-4xl">
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
        </Reveal>
      </section>

      <FAQ />

      <section className="section-pad relative overflow-hidden bg-hero-bg text-hero-fg">
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-medium md:text-4xl">
            <T en="Let's fix the way your revenue runs" fr="Réparons la façon dont votre revenue fonctionne" />
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-hero-fg/75">
            <T
              en="Whether you need an advisor, an operator, or a partner who invests, the starting point is the same: a clear look at how your revenue engine works today."
              fr="Que vous cherchiez un conseiller, un opérateur ou un partenaire qui investit, le point de départ est le même : un regard clair sur votre moteur revenue aujourd'hui."
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
