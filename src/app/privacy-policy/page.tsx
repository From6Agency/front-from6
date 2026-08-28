import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FROM 6 AGENCY.",
  alternates: { canonical: "/privacy-policy" },
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent("privacy");
  const body = content.content ?? { en: "", fr: "" };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-medium">
          <T en="Privacy Policy" fr="Politique de confidentialité" />
        </h1>
        <div className="space-y-4 whitespace-pre-line leading-relaxed text-muted-foreground">
          <T en={body.en} fr={body.fr} />
        </div>
      </div>
    </div>
  );
}
