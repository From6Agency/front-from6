import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { T } from "@/components/Bilingual";
import { cn } from "@/lib/utils";

/* Page : conteneur commun des pages intérieures, sous le header fixe. */
export function Page({ children, width = "5xl" }: { children: ReactNode; width?: "3xl" | "4xl" | "5xl" | "6xl" }) {
  const max = { "3xl": "max-w-3xl", "4xl": "max-w-4xl", "5xl": "max-w-5xl", "6xl": "max-w-6xl" }[width];
  return (
    <div className="px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div className={cn("mx-auto", max)}>{children}</div>
    </div>
  );
}

/* En-tête de page : le titre porte seul, un chapeau, un lien de contexte facultatif. */
export function PageHeader({ title, lead, aside, className }: { title: ReactNode; lead?: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <h1 className="text-balance text-4xl leading-[1.04] md:text-[3.5rem]">{title}</h1>
      {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>}
      {aside && <div className="mt-5">{aside}</div>}
    </header>
  );
}

/* En-tête de section : aligné à gauche, action à droite sur grand écran. */
export function SectionHeader({ title, lead, action, className }: { title: ReactNode; lead?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <h2 className="text-balance text-2xl leading-tight md:text-[1.75rem]">{title}</h2>
        {lead && <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("mt-16 md:mt-24", className)}>
      {children}
    </section>
  );
}

/* Lien fléché : en Signal, la seule couleur du site, réservée aux liens et aux boutons. */
export function ArrowLink({ href, children, external, className }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  const classes = cn("group inline-flex items-center gap-1.5 text-sm font-medium text-signal transition-colors hover:text-foreground", className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

/* Bouton pilule : Signal plein pour l'action principale, filet pour la secondaire.
   Le cercle complet est le seul rayon admis par la marque avec l'angle droit.
   "ghost" est le contour sur bande noire. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "inverted" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
    size === "lg" ? "h-12 px-7 text-base" : "h-11 px-6 text-sm",
    variant === "primary" && "bg-signal text-white hover:bg-foreground",
    variant === "outline" && "border border-border bg-transparent hover:border-foreground",
    variant === "inverted" && "bg-signal text-white hover:bg-hero-fg hover:text-hero-bg",
    variant === "ghost" && "border border-hero-fg/30 bg-transparent text-hero-fg hover:border-hero-fg",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/* Liste à filets : une ligne = un terme et sa définition, pas une carte. */
export function RowList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("divide-y divide-border border-y border-border", className)}>{children}</div>;
}

export function Row({
  term,
  children,
  href,
  external,
  className,
}: {
  term: ReactNode;
  children?: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <div className="font-medium transition-colors group-hover:text-signal">{term}</div>
      {children && <div className="text-[0.9375rem] leading-relaxed text-muted-foreground md:col-span-2">{children}</div>}
    </>
  );
  const grid = cn("grid gap-1 py-4 md:grid-cols-3 md:gap-8", className);
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(grid, "group")}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cn(grid, "group")}>
        {inner}
      </Link>
    );
  }
  return <div className={grid}>{inner}</div>;
}

/* Pastille : statut ou rôle, en étiquette Inter, cercle complet. */
export function Pill({ children, tone = "muted", className }: { children: ReactNode; tone?: "muted" | "solid" | "outline"; className?: string }) {
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-full px-2.5 py-1",
        tone === "muted" && "bg-muted text-foreground",
        tone === "solid" && "bg-primary text-primary-foreground",
        tone === "outline" && "border border-border text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Carte-porte : un parcours entier, cliquable, avec son étiquette et sa flèche.
   Angle droit, filet 1px, l'appel en Signal (Signal doux sur fond noir). */
export function DoorCard({
  href,
  label,
  title,
  children,
  cta,
  dark,
}: {
  href: string;
  label: { en: string; fr: string };
  title: ReactNode;
  children: ReactNode;
  cta: { en: string; fr: string };
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col border p-6 transition-colors md:p-7",
        dark ? "border-hero-line bg-hero-fog hover:border-hero-fg" : "border-border bg-card hover:border-foreground",
      )}
    >
      <span className={cn("label", dark ? "text-hero-steel" : "text-muted-foreground")}>
        <T en={label.en} fr={label.fr} />
      </span>
      <span className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.02em] md:text-2xl">{title}</span>
      <span className={cn("mt-3 flex-1 text-[0.9375rem] leading-relaxed", dark ? "text-hero-fg/70" : "text-muted-foreground")}>{children}</span>
      <span className={cn("mt-6 inline-flex items-center gap-2 text-sm font-medium", dark ? "text-signal-soft" : "text-signal")}>
        <T en={cta.en} fr={cta.fr} />
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  );
}
