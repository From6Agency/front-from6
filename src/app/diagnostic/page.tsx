import type { Metadata } from "next";
import { Suspense } from "react";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { T } from "@/components/Bilingual";
import { ArrowLink, Page, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Diagnostic",
  description: "A short diagnostic to identify the next step on your revenue systems, before any call.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <Page>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <PageHeader
          title={<T en="Let's identify the next step." fr="Identifions la prochaine étape." />}
          lead={
            <T
              en="No finished specification is needed. Three short steps: your need, your context, then a first orientation before your contact details."
              fr="Aucun cahier des charges finalisé n'est nécessaire. Trois étapes courtes : votre besoin, votre contexte, puis une première orientation avant vos coordonnées."
            />
          }
          aside={
            <ArrowLink href="/darix">
              <T en="Discover Darix" fr="Découvrir Darix" />
            </ArrowLink>
          }
        />
        <Suspense fallback={null}>
          <DiagnosticForm />
        </Suspense>
      </div>
    </Page>
  );
}
