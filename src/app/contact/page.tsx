import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with FROM 6 AGENCY to discuss B2B SaaS revenue advisory, investment, or speaking opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-wide text-muted-foreground">Contact</p>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            <T en="Get in Touch" fr="Prenez contact" />
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            <T
              en="Whether you're looking for strategic advisory, exploring investment opportunities, or interested in media collaborations."
              fr="Que vous recherchiez du conseil stratégique, exploriez des opportunités d'investissement ou soyez intéressé par des collaborations médiatiques."
            />
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
