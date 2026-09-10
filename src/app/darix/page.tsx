import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { T } from "@/components/Bilingual";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "From 6 and Darix, how they connect",
  description: "Darix is the operational team co-founded by Franck Berthelot for Salesforce, CPQ, billing, and revenue system projects.",
  alternates: { canonical: "/darix" },
};

const DARIX_URL = "https://darix.io/?utm_source=from6agency&utm_medium=referral&utm_campaign=darix";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "From 6", item: "https://from6agency.com/" },
    { "@type": "ListItem", position: 2, name: "Darix", item: "https://from6agency.com/darix" },
  ],
};

export default function DarixPage() {
  return (
    <div className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 kicker text-muted-foreground">
          <T en="Darix" fr="Darix" />
        </p>
        <h1 className="mb-8 text-4xl font-medium md:text-5xl">
          <T en="Darix, the team dedicated to your revenue systems." fr="Darix, l'équipe dédiée à vos systèmes revenue." />
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          <T
            en="Franck Berthelot co-founded Darix to carry the operational side of revenue projects: Salesforce, Revenue Cloud, CPQ, billing, ERP integrations, data, and AI. From 6 is where a need first gets framed; Darix is where it gets built."
            fr="Franck Berthelot a cofondé Darix pour porter le volet opérationnel des projets revenue : Salesforce, Revenue Cloud, CPQ, facturation, intégrations ERP, data et IA. From 6 est l'endroit où un besoin se cadre en premier ; Darix est l'endroit où il se construit."
          />
        </p>

        <h2 className="mb-3 mt-14 text-2xl font-medium">
          <T en="When should you reach out to Darix?" fr="Quand solliciter Darix ?" />
        </h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          <T
            en="Once a problem is reasonably clear: a Salesforce setup that no longer matches how the sales team actually works, a CPQ project to frame, billing that needs to reconcile with the CRM, or data quality that's starting to cost real time. From 6's diagnostic exists precisely to help reach that point."
            fr="Dès qu'un problème est raisonnablement clair : un paramétrage Salesforce qui ne correspond plus à la façon dont l'équipe commerciale travaille, un projet CPQ à cadrer, une facturation à réconcilier avec le CRM, ou une qualité de données qui commence à coûter du temps réel. Le diagnostic de From 6 sert justement à arriver à ce point."
          />
        </p>

        <h2 className="mb-3 mt-10 text-2xl font-medium">
          <T en="What's the first step?" fr="Quel est le premier pas ?" />
        </h2>
        <p className="mb-10 leading-relaxed text-muted-foreground">
          <T
            en="The From 6 diagnostic: a short set of questions on the need, the context, and the timeline. It ends with a first direction, before any call is booked."
            fr="Le diagnostic From 6 : quelques questions sur le besoin, le contexte et le calendrier. Il se termine par une première orientation, avant même de réserver un appel."
          />
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/diagnostic"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <T en="Prepare my exchange with Darix" fr="Préparer mon échange avec Darix" />
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={DARIX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 text-base font-medium hover:bg-accent"
          >
            <T en="Visit darix.io" fr="Visiter darix.io" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
}
