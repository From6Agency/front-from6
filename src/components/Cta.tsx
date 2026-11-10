"use client";

import Link from "next/link";
import type { FocusEvent, PointerEvent, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* La pilule de la grammaire Sonho : elle se remplit depuis le point d'entrée
   du pointeur avec sa couleur d'arrivée, et son libellé roule. Au clavier, le
   remplissage part du centre. Sur écran tactile, rien ne bouge. */
const fillFrom = (el: HTMLElement, x: number, y: number) => {
  const box = el.getBoundingClientRect();
  const px = x - box.left;
  const py = y - box.top;
  const d = 2 * Math.hypot(Math.max(px, box.width - px), Math.max(py, box.height - py));
  el.style.setProperty("--fx-x", `${px}px`);
  el.style.setProperty("--fx-y", `${py}px`);
  el.style.setProperty("--fx-d", `${d}px`);
};

export const ctaHandlers = {
  onPointerEnter: (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    fillFrom(e.currentTarget, e.clientX, e.clientY);
    e.currentTarget.classList.add("is-fx");
  },
  onPointerLeave: (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    fillFrom(e.currentTarget, e.clientX, e.clientY);
    e.currentTarget.classList.remove("is-fx");
  },
  onFocus: (e: FocusEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (!el.matches(":focus-visible")) return;
    const box = el.getBoundingClientRect();
    fillFrom(el, box.left + box.width / 2, box.top + box.height / 2);
    el.classList.add("is-fx");
  },
  onBlur: (e: FocusEvent<HTMLElement>) => e.currentTarget.classList.remove("is-fx"),
};

export type CtaVariant = "ink" | "soft" | "paper" | "glass";
export type CtaSize = "sm" | "md" | "lg";

export function Cta({
  children,
  href,
  external,
  variant = "ink",
  size = "md",
  arrow,
  className,
  type = "button",
  onClick,
  disabled,
  attrs,
}: {
  children: ReactNode;
  /** Route interne (ou adresse externe avec `external`). Sans href : un bouton. */
  href?: string;
  external?: boolean;
  variant?: CtaVariant;
  size?: CtaSize;
  /** Flèche de fin, hors du libellé qui roule. */
  arrow?: "right" | "up-right";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** Attributs supplémentaires du bouton (data-cal-* de la prise de rendez-vous). */
  attrs?: Record<string, string>;
}) {
  const classes = cn("btn cta-fx", `btn-${variant}`, `btn-${size}`, className);
  const inner = (
    <>
      <span className="cta-fill" aria-hidden="true" />
      <span className="cta-label">
        <span className="l1">{children}</span>
        <span className="l2" aria-hidden="true">
          {children}
        </span>
      </span>
      {arrow === "right" && <ArrowRight className="ic arrow" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />}
      {arrow === "up-right" && <ArrowUpRight className="ic arrow" width={18} height={18} strokeWidth={1.9} aria-hidden="true" />}
    </>
  );
  if (href && external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...ctaHandlers}>
        {inner}
      </a>
    );
  if (href)
    return (
      <Link href={href} className={classes} onClick={onClick} {...ctaHandlers}>
        {inner}
      </Link>
    );
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...attrs} {...ctaHandlers}>
      {inner}
    </button>
  );
}
