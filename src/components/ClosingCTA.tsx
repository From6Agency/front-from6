import Link from "next/link";
import { T } from "@/components/Bilingual";
import { Button } from "@/components/ui";

/* Un seul appel de fin de page, repris sur les pages intérieures : les deux
   parcours, puis la porte de secours vers le contact. */
export function ClosingCTA() {
  return (
    <section className="mt-16 bg-muted/60 p-8 md:mt-24 md:p-12">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 className="text-balance text-2xl md:text-3xl">
            <T en="Let's talk about what you want to build" fr="Parlons de ce que vous voulez construire" />
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            <T
              en="An operational need or an entrepreneurial project: pick the path that matches your situation."
              fr="Un besoin opérationnel ou un projet entrepreneurial : choisissez le parcours qui correspond à votre situation."
            />
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <T en="Media, partnership or another subject: " fr="Média, partenariat ou autre sujet : " />
            <Link href="/contact" className="font-medium text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
              <T en="write to me" fr="écrivez-moi" />
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button href="/diagnostic" size="lg">
            <T en="Companies: start the diagnostic" fr="Entreprises : démarrer le diagnostic" />
          </Button>
          <Button href="/proposer-un-projet" size="lg" variant="outline">
            <T en="Founders: present a project" fr="Fondateurs : présenter un projet" />
          </Button>
        </div>
      </div>
    </section>
  );
}
