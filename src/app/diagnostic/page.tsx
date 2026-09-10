import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Diagnostic",
  description: "A short diagnostic to identify the next step on your revenue systems, before any call.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-3 kicker text-muted-foreground">
            <T en="For companies" fr="Pour les entreprises" />
          </p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="Let's identify the next step." fr="Identifions la prochaine étape." />
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            <T
              en="No finished requirements document is needed to start. Three short steps: your need, your context, and a first orientation before your contact details."
              fr="Aucun cahier des charges finalisé n'est nécessaire pour commencer. Trois étapes courtes : votre besoin, votre contexte, puis une première orientation avant vos coordonnées."
            />
          </p>
          <Link href="/darix" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
            <T en="Discover Darix" fr="Découvrir Darix" />
          </Link>
        </div>
        <Suspense fallback={null}>
          <DiagnosticForm />
        </Suspense>
      </div>
    </div>
  );
}
