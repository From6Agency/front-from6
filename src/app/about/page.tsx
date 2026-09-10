import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, ArrowUpRight, ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";

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

export default async function AboutPage() {
  const about = await getSiteContent("about");
  const bioEn = about.bio?.en ?? "";
  const bioFr = about.bio?.fr ?? "";
  const photoUrl = about.photo?.en || "/brand/franck-profile.png";

  return (
    <div className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="sticky top-32">
              <div className="mb-6 aspect-square w-full overflow-hidden rounded-2xl card-shadow">
                <Image src={photoUrl} alt="Franck Berthelot" width={480} height={480} className="h-full w-full scale-[1.06] object-cover" />
              </div>
              <a
                href="https://www.linkedin.com/in/franckberthelot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                <T en="Franck Berthelot on LinkedIn" fr="Franck Berthelot sur LinkedIn" />
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-3 kicker text-muted-foreground">
              <T en="About us" fr="À propos" />
            </p>
            <h1 className="mb-8 text-4xl font-medium md:text-5xl">FROM 6 AGENCY</h1>
            <div className="max-w-none">
              {bioEn.split("\n\n").map((para, i) => (
                <p key={i} className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  <T en={para} fr={bioFr.split("\n\n")[i] ?? para} />
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/diagnostic"
            className="group rounded-2xl border border-border bg-card p-7 card-shadow hover-lift"
          >
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              <T en="For companies" fr="Pour les entreprises" />
            </p>
            <h2 className="mb-4 text-lg font-medium">
              <T en="Assess my need with Darix" fr="Évaluer mon besoin avec Darix" />
            </h2>
            <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
              <T en="Start the diagnostic" fr="Démarrer le diagnostic" /> <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/proposer-un-projet"
            className="group rounded-2xl border border-border bg-card p-7 card-shadow hover-lift"
          >
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              <T en="For founders" fr="Pour les fondateurs" />
            </p>
            <h2 className="mb-4 text-lg font-medium">
              <T en="Present my project" fr="Présenter mon projet" />
            </h2>
            <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
              <T en="Get started" fr="Commencer" /> <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
}
