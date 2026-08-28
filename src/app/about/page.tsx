import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { BookCallButton } from "@/components/BookCallButton";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "About FROM 6 AGENCY | Strategic Partner for B2B SaaS",
  description: "Meet FROM 6 AGENCY, a strategic partner for B2B SaaS companies combining advisory, investment, and revenue-platform execution.",
  alternates: { canonical: "/about" },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Franck Berthelot",
  jobTitle: "Lead-to-Cash Architect",
  url: "https://from6agency.com/about",
  sameAs: ["https://www.linkedin.com/in/franckberthelot"],
  worksFor: { "@type": "Organization", name: "FROM 6 AGENCY", url: "https://from6agency.com" },
  knowsAbout: ["Revenue Operations", "Salesforce CPQ", "Lead-to-Cash", "B2B SaaS", "Billing Systems"],
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const about = await getSiteContent("about");
  const bioEn = about.bio?.en ?? "";
  const bioFr = about.bio?.fr ?? "";
  const photoUrl = about.photo?.en || "/brand/franck-profile.jpeg";

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

        <div className="rounded-2xl bg-muted/50 p-10 text-center">
          <h2 className="mb-4 text-2xl font-medium">
            <T en="Get in Touch" fr="Prenez contact" />
          </h2>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            <T en="Ready to discuss how we can work together?" fr="Prêt à discuter de notre collaboration ?" />
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <T en="Get in Touch" fr="Prendre contact" />
            </Link>
            <BookCallButton size="lg" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
}
