import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { T } from "@/components/Bilingual";

// Invitation de fin de page reprise sur /advisory, /investments, /about et
// /ressources : un seul choix de parcours vers /contact, pas un CTA
// spécifique par page.
export function ClosingCTA() {
  return (
    <div className="mt-20 rounded-2xl bg-muted/50 p-10 text-center md:p-14">
      <h2 className="mb-4 text-2xl font-medium md:text-3xl">
        <T en="Let's talk about what you want to build" fr="Parlons de ce que vous voulez construire" />
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
        <T
          en="An operational need or an entrepreneurial project: pick the path that matches your situation."
          fr="Un besoin opérationnel ou un projet entrepreneurial : choisissez le parcours qui correspond à votre situation."
        />
      </p>
      <Link
        href="/contact"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary-hover"
      >
        <T en="Choose my path" fr="Choisir mon parcours" />
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
