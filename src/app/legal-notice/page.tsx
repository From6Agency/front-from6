import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { Page, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and publishing information for FROM 6 AGENCY.",
  alternates: { canonical: "/legal-notice" },
};

export default async function LegalNoticePage() {
  const content = await getSiteContent("legal");
  const body = content.content ?? { en: "", fr: "" };

  return (
    <Page width="3xl">
      <PageHeader title={<T en="Legal notice" fr="Mentions légales" />} />
      <div className="mt-10 whitespace-pre-line text-[0.9375rem] leading-relaxed text-muted-foreground">
        <T en={body.en} fr={body.fr} />
      </div>
    </Page>
  );
}
