import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { Page, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FROM 6 AGENCY.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent("privacy");
  const body = content.content ?? { en: "", fr: "" };

  return (
    <Page width="3xl">
      <PageHeader title={<T en="Privacy policy" fr="Politique de confidentialité" />} />
      <div className="mt-10 whitespace-pre-line text-[0.9375rem] leading-relaxed text-muted-foreground">
        <T en={body.en} fr={body.fr} />
      </div>
    </Page>
  );
}
