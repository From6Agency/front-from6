import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPortfolioCompanies } from "@/lib/content";
import { DARIX_OFFERS, darixLink } from "@/lib/darix";
import { T } from "@/components/Bilingual";
import { FAQ } from "@/components/FAQ";
import { BookCallButton } from "@/components/BookCallButton";
import { Cta } from "@/components/Cta";
import { DoorStage } from "@/components/home/DoorStage";
import { Dock } from "@/components/home/Dock";

const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

const EPISODE_URL =
  "https://smartlink.ausha.co/engrenages/episode-29-le-role-du-revops-dans-les-entrailles-de-salesforce-le-decryptage-de-la-brique-cpq-franck-berthelot";
const MASTERCLASS_URL = "https://www.youtube.com/watch?v=SWjLUN1Vofs";

const ROLE_LABELS: Record<string, { en: string; fr: string }> = {
  "co-founder": { en: "Co-founder", fr: "Cofondateur" },
  investor: { en: "Investor", fr: "Investisseur" },
};
const STATUS_LABELS: Record<string, { en: string; fr: string }> = {
  active: { en: "Active", fr: "Actif" },
  beta: { en: "Beta", fr: "Bêta" },
  "in build": { en: "In build", fr: "En construction" },
};

/* La marque de chaque société est le titre de sa fiche. Chaque fichier est
   dimensionné sur son encre visible (classe .mark-*), pour un poids égal. */
const MARKS: Record<string, { src: string; width: number; height: number; className: string }> = {
  Darix: { src: "/portfolio/darix-mark.png", width: 1920, height: 1560, className: "mark mark-darix" },
  MicePro: { src: "/portfolio/micepro-logo.png", width: 2560, height: 967, className: "mark mark-micepro" },
  "6WAY": { src: "/portfolio/6way-wordmark.png", width: 1600, height: 276, className: "mark mark-6way" },
};
/* Trois fiches de tailles différentes : la première large, la deuxième
   étroite, les suivantes en pleine largeur. */
const REC_SIZE = ["rec-lg", "rec-md"];

function label(map: Record<string, { en: string; fr: string }>, value: string | null) {
  if (!value) return null;
  return map[value.toLowerCase()] ?? { en: value, fr: value };
}

const arrowRight = <ArrowRight className="ic" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />;
const arrowUpRight = <ArrowUpRight className="ic row-arrow" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />;

export default async function Home() {
  const companies = await getPortfolioCompanies();
  // Darix d'abord : la cofondation active est la preuve qui porte le reste.
  const ordered = [...companies].sort((a, b) => Number(b.name === "Darix") - Number(a.name === "Darix") || (a.display_order ?? 0) - (b.display_order ?? 0));

  return (
    <div className="sonho">
      {/* Premier écran : le titre centré sur Paper, un halo doux, puis la scène
          des deux portes reliées à la marque F6. */}
      <section className="hero" id="top">
        <span className="halo" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <h1 className="rise" style={delay(0)}>
              <T en="Field experience to help your company grow." fr="L'expérience du terrain pour faire grandir votre entreprise." />
            </h1>
            <p className="lead rise" style={delay(90)}>
              <T
                en="From 6 connects companies to Darix's revenue expertise and supports founders through advisory and investment."
                fr="From 6 relie les entreprises à l'expertise revenus de Darix et accompagne les fondateurs par le conseil et l'investissement."
              />
            </p>
            <p className="byline tnum rise" style={delay(160)}>
              <T en="Franck Berthelot, co-founder of Darix and 6WAY, investor in MicePro." fr="Franck Berthelot, cofondateur de Darix et de 6WAY, investisseur dans MicePro." />
            </p>
          </div>
          <DoorStage />
        </div>
      </section>

      {/* Preuve : trois fiches, la marque de chaque société en titre. */}
      <section className="proof sheet fog" id="entreprises" aria-labelledby="t-proof">
        <div className="wrap">
          <header className="sec-head">
            <h2 id="t-proof">
              <T en="Three companies, three forms of involvement." fr="Trois entreprises, trois formes d'implication." />
            </h2>
            <Link className="link-arrow" href="/portfolio">
              <T en="See the projects" fr="Voir les projets" />
              {arrowRight}
            </Link>
          </header>
          <div className="records">
            {ordered.map((company, index) => {
              const role = label(ROLE_LABELS, company.role);
              const status = label(STATUS_LABELS, company.status);
              const mark = MARKS[company.name];
              const lead = company.name === "Darix";
              return (
                <article key={company.id} className={`rec ${REC_SIZE[index] ?? "rec-wide"}`}>
                  <header className="rec-head">
                    {mark ? (
                      <h3 className="rec-mark">
                        <Image className={mark.className} src={mark.src} width={mark.width} height={mark.height} alt={company.name} />
                      </h3>
                    ) : (
                      <h3 className="rec-name">{company.name}</h3>
                    )}
                    {status && (
                      <span className={status.en === "Active" ? "pill pill-solid" : "pill pill-line"}>
                        <T en={status.en} fr={status.fr} />
                      </span>
                    )}
                  </header>
                  {(role || company.stage_year) && (
                    <p className="rec-meta tnum">
                      {role && <T en={role.en} fr={role.fr} />}
                      {role && company.stage_year && ", "}
                      {company.stage_year}
                    </p>
                  )}
                  <p className="rec-desc">
                    <T en={company.description} fr={company.description_fr || company.description} />
                  </p>
                  <div className="rec-actions">
                    {company.website_url && (
                      <Cta href={company.website_url} external variant={lead ? "ink" : "soft"} arrow="up-right">
                        <T en={`Visit ${company.name}`} fr={`Découvrir ${company.name}`} />
                      </Cta>
                    )}
                    {lead && (
                      <Cta href="/darix" variant="soft" arrow="right">
                        <T en="How From 6 and Darix connect" fr="Le lien entre From 6 et Darix" />
                      </Cta>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Darix : le titre et les appels à côté d'une surface blanche de six lignes. */}
      <section className="darix sheet fog flat" id="darix" aria-labelledby="t-darix">
        <div className="wrap darix-grid">
          <div className="darix-copy">
            <h2 id="t-darix">
              <T en="Aligning sales, CRM and billing in one system." fr="Aligner ventes, CRM et facturation dans un même système." />
            </h2>
            <p className="lead">
              <T
                en="From the quote to the cash, your teams depend on shared processes and data. From 6 frames the need; Darix, the team Franck co-founded, executes on Salesforce. Its current offer, in six lines:"
                fr="De la vente à l'encaissement, vos équipes dépendent de processus et de données partagés. From 6 cadre le besoin ; Darix, l'équipe que Franck a cofondée, exécute sur Salesforce. Son offre actuelle, en six lignes :"
              />
            </p>
            <div className="cta-row">
              <Cta href="/diagnostic" size="lg" arrow="right">
                <T en="Assess my need" fr="Évaluer mon besoin" />
              </Cta>
              <Link className="link-arrow" href="/advisory">
                <T en="How a request moves from From 6 to Darix" fr="Comment une demande passe de From 6 à Darix" />
                {arrowRight}
              </Link>
            </div>
          </div>
          <ul className="offers">
            {DARIX_OFFERS.map((offer) => (
              <li key={offer.key}>
                <a className="offer" href={darixLink(offer.path, "home")} target="_blank" rel="noopener noreferrer">
                  <span className="offer-name">
                    <T en={offer.label.en} fr={offer.label.fr} />
                  </span>
                  <span className="offer-teaser">
                    <T en={offer.teaser.en} fr={offer.teaser.fr} />
                  </span>
                  <ArrowUpRight className="ic offer-arrow" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Parcours : le portrait dans un cadre arrondi, deux puces de verre, le texte et trois lignes. */}
      <section className="path sheet" id="parcours" aria-labelledby="t-path">
        <div className="wrap path-grid">
          <figure className="portrait">
            <i className="portrait-ring" aria-hidden="true" />
            <div className="frame">
              <Image src="/brand/franck-profile.webp" width={900} height={1350} alt="Franck Berthelot" sizes="(min-width: 900px) 460px, 440px" />
            </div>
            <div className="chip chip-a">
              <i className="chip-dot" aria-hidden="true" />
              <T en="Co-founder of Darix and 6WAY" fr="Cofondateur de Darix et de 6WAY" />
            </div>
            <div className="chip chip-b">
              <i className="chip-dot" aria-hidden="true" />
              <T en="Investor in MicePro" fr="Investisseur dans MicePro" />
            </div>
          </figure>
          <div className="path-copy">
            <h2 id="t-path">
              <T en="A path across finance, business systems and entrepreneurship." fr="Un parcours entre finance, systèmes d'entreprise et entrepreneuriat." />
            </h2>
            <p className="lead">
              <T
                en="Finance first, then Salesforce architecture on revenue platforms (Lead-to-Cash, CPQ, billing, integrations), then entrepreneurship. That order is why I read a company through its flows and its systems before its pitch, and why the advice comes with hands that still build."
                fr="La finance d'abord, puis l'architecture Salesforce des plateformes revenus (Lead-to-Cash, CPQ, facturation, intégrations), puis l'entrepreneuriat. Cet ordre explique pourquoi je lis une entreprise par ses flux et ses systèmes avant son pitch, et pourquoi le conseil vient avec des mains qui construisent encore."
              />
            </p>
            <ul className="rows tnum">
              <li>
                <a className="row" href={EPISODE_URL} target="_blank" rel="noopener noreferrer">
                  <span className="row-term">Podcast Engrenages, épisode 29</span>
                  <span className="row-def">
                    <T en="The role of RevOps inside Salesforce, decoding the CPQ layer." fr="Le rôle du RevOps dans les entrailles de Salesforce, décryptage de la brique CPQ." />
                  </span>
                  {arrowUpRight}
                </a>
              </li>
              <li>
                <a className="row" href={MASTERCLASS_URL} target="_blank" rel="noopener noreferrer">
                  <span className="row-term">
                    <T en="Masterclass, Lead-to-Cash on Salesforce" fr="Masterclass, Lead-to-Cash sur Salesforce" />
                  </span>
                  <span className="row-def">
                    <T en="CPQ, billing and integrations, so revenue flows from first touch to cash." fr="CPQ, facturation et intégrations, pour que le revenu circule du premier contact au cash." />
                  </span>
                  {arrowUpRight}
                </a>
              </li>
              <li>
                <Link className="row" href="/about">
                  <span className="row-term">
                    <T en="The full background" fr="Le parcours complet" />
                  </span>
                  <span className="row-def">
                    <T en="From 6, Darix and the companies, in detail." fr="From 6, Darix et les entreprises, en détail." />
                  </span>
                  <ArrowRight className="ic row-arrow" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="faq sheet fog" id="faq" aria-labelledby="t-faq">
        <div className="wrap faq-grid">
          <h2 id="t-faq">
            <T en="Frequently asked questions" fr="Questions fréquentes" />
          </h2>
          <FAQ />
        </div>
      </section>

      {/* La seule bande noire du site : l'appel de fin, les deux parcours. */}
      <section className="band sheet" id="parler" data-tone="dark" aria-labelledby="t-band">
        <span className="band-halo" aria-hidden="true" />
        <div className="wrap band-grid">
          <div className="band-copy">
            <h2 id="t-band">
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
              <Link className="link-soft" href="/contact">
                <T en="write to me" fr="écrivez-moi" />
              </Link>
              .
            </p>
          </div>
          <div className="band-actions">
            <Cta href="/diagnostic" variant="paper" size="lg" arrow="right">
              <T en="Companies: assess my need" fr="Entreprises : évaluer mon besoin" />
            </Cta>
            <Cta href="/proposer-un-projet" variant="glass" size="lg" arrow="right">
              <T en="Founders: present my project" fr="Fondateurs : présenter mon projet" />
            </Cta>
            <p className="call tnum">
              <T en="Or a 30-minute call:" fr="Ou un appel de 30 minutes :" />
              <BookCallButton variant="ghost" size="sm" icon={false}>
                <T en="Book a slot" fr="Réserver un créneau" />
              </BookCallButton>
            </p>
          </div>
        </div>
      </section>

      <Dock />
    </div>
  );
}
