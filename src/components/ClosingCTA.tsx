import Link from "next/link";
import { T } from "@/components/Bilingual";
import { Cta } from "@/components/Cta";

/* Un seul appel de fin de page, repris sur les pages intérieures : une
   surface Ink arrondie, les deux parcours, puis la porte de secours vers le
   contact. */
export function ClosingCTA() {
  return (
    <section className="closing-card sonho mt-16 md:mt-24" data-tone="dark">
      <span className="band-halo" aria-hidden="true" />
      <div className="band-grid">
        <div className="band-copy">
          <h2>
            <T en="Let's talk about what you want to build" fr="Parlons de ce que vous voulez construire" />
          </h2>
          <p className="lead">
            <T
              en="An operational need or an entrepreneurial project: pick the path that matches your situation."
              fr="Un besoin opérationnel ou un projet entrepreneurial : choisissez le parcours qui correspond à votre situation."
            />
          </p>
          <p className="band-note">
            <T en="Media, partnership or another subject: " fr="Média, partenariat ou autre sujet : " />
            <Link href="/contact" className="link-soft">
              <T en="write to me" fr="écrivez-moi" />
            </Link>
            .
          </p>
        </div>
        <div className="band-actions">
          <Cta href="/diagnostic" variant="paper" size="lg" arrow="right">
            <T en="Companies: start the diagnostic" fr="Entreprises : démarrer le diagnostic" />
          </Cta>
          <Cta href="/proposer-un-projet" variant="glass" size="lg" arrow="right">
            <T en="Founders: present a project" fr="Fondateurs : présenter un projet" />
          </Cta>
        </div>
      </div>
    </section>
  );
}
