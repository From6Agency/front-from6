import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and publishing information for FROM 6 AGENCY.",
  alternates: { canonical: "/legal-notice" },
};

export const revalidate = 900;

export default async function LegalNoticePage() {
  const content = await getSiteContent("legal");
  const body = content.content ?? { en: "", fr: "" };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-medium">
          <T en="Legal Notice" fr="Mentions Légales" />
        </h1>
        <div className="space-y-4 whitespace-pre-line leading-relaxed text-muted-foreground">
          <T en={body.en} fr={body.fr} />
        </div>
      </div>
    </div>
  );
}
