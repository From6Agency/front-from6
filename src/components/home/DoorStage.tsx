"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { T } from "@/components/Bilingual";
import { Cta } from "@/components/Cta";
import { Mark } from "@/components/brand/Logo";
import { useLanguage } from "@/components/providers/LanguageProvider";

export type DoorKey = "companies" | "founders";

export const DOORS: Array<{
  key: DoorKey;
  href: string;
  title: { en: string; fr: string };
  question: { en: string; fr: string };
  steps: Array<{ en: string; fr: string }>;
  cta: { en: string; fr: string };
}> = [
  {
    key: "companies",
    href: "/diagnostic",
    title: { en: "Companies", fr: "Entreprises" },
    question: { en: "Are your systems slowing your growth?", fr: "Vos systèmes freinent votre croissance ?" },
    // La chaîne Lead-to-Cash, spécialité de Franck : l'ordre porte du sens.
    steps: [
      { en: "Quote", fr: "Devis" },
      { en: "Contract", fr: "Contrat" },
      { en: "Invoice", fr: "Facture" },
      { en: "Cash", fr: "Encaissement" },
    ],
    cta: { en: "Assess my need", fr: "Évaluer mon besoin" },
  },
  {
    key: "founders",
    href: "/proposer-un-projet",
    title: { en: "Founders", fr: "Fondateurs" },
    question: { en: "Looking for an investor who knows the field?", fr: "Vous cherchez un investisseur qui connaît le terrain ?" },
    // Les quatre formes d'appui réelles (PRODUCT.md), sans mention de ticket.
    steps: [
      { en: "Advisory", fr: "Conseil" },
      { en: "Involvement", fr: "Implication" },
      { en: "Investment", fr: "Investissement" },
      { en: "Co-founding", fr: "Co-fondation" },
    ],
    cta: { en: "Present my project", fr: "Présenter mon projet" },
  },
];

/* La scène des deux portes : la marque F6 dans un disque de verre, reliée aux
   deux portes par un connecteur mesuré sur la mise en page (il rejoint les
   portes exactement, à toute largeur). La porte sous le pointeur ou le focus
   clavier est active : son connecteur et sa voie s'allument en Signal, son
   ombre se lève, le contenu de l'autre s'efface à 55 %. */
export function DoorStage() {
  const { language } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<DoorKey | null>(null);
  const [focused, setFocused] = useState<DoorKey | null>(null);
  const active = hovered ?? focused;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const svg = stage.querySelector<SVGSVGElement>(".wires");
    const hub = stage.querySelector<HTMLElement>(".hub");
    const doors = Array.from(stage.querySelectorAll<HTMLElement>(".door"));
    const lanes = Array.from(stage.querySelectorAll<HTMLElement>(".lane"));
    if (!svg || !hub || doors.length < 2) return;
    const [doorA, doorB] = doors;

    const put = (selector: string, attrs: Record<string, string | number>) => {
      svg.querySelectorAll(selector).forEach((node) => {
        Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, String(value)));
      });
    };
    // Un filet relie chaque pastille à la précédente quand elles partagent une
    // ligne ; celles qui commencent une ligne n'en ont pas.
    const markLaneRows = () => {
      lanes.forEach((lane) => {
        let previous: HTMLElement | null = null;
        lane.querySelectorAll<HTMLElement>("li").forEach((pill) => {
          pill.toggleAttribute("data-start", !previous || pill.offsetTop > previous.offsetTop + 2);
          previous = pill;
        });
      });
    };
    // Côte à côte : un montant, une barre et deux bras arrondis. Empilées :
    // deux filets verticaux courts.
    const layoutWires = () => {
      const width = stage.offsetWidth;
      const height = stage.offsetHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const hx = hub.offsetLeft + hub.offsetWidth / 2;
      const hubTop = hub.offsetTop;
      const hubBottom = hubTop + hub.offsetHeight;
      const stacked = doorB.offsetTop > doorA.offsetTop + doorA.offsetHeight / 2;
      let stub = "";
      let armA: string;
      let armB: string;
      let ports: [number, number][];
      if (stacked) {
        const aBottom = doorA.offsetTop + doorA.offsetHeight;
        const bTop = doorB.offsetTop;
        armA = `M${hx} ${hubTop}V${aBottom}`;
        armB = `M${hx} ${hubBottom}V${bTop}`;
        ports = [
          [hx, aBottom],
          [hx, bTop],
        ];
      } else {
        const top = doorA.offsetTop;
        const barY = hubBottom + Math.round((top - hubBottom) * 0.46);
        const ax = doorA.offsetLeft + doorA.offsetWidth / 2;
        const bx = doorB.offsetLeft + doorB.offsetWidth / 2;
        const r = Math.max(2, Math.min(14, top - barY - 6, (hx - ax) / 2));
        stub = `M${hx} ${hubBottom}V${barY}`;
        armA = `M${hx} ${barY}H${ax + r}Q${ax} ${barY} ${ax} ${barY + r}V${top}`;
        armB = `M${hx} ${barY}H${bx - r}Q${bx} ${barY} ${bx} ${barY + r}V${top}`;
        ports = [
          [ax, top],
          [bx, top],
        ];
      }
      put(".w-stub, .lit-stub", { d: stub });
      put(".w-a, .lit-a", { d: armA });
      put(".w-b, .lit-b", { d: armB });
      put(".port-a", { cx: ports[0][0], cy: ports[0][1] });
      put(".port-b", { cx: ports[1][0], cy: ports[1][1] });
    };
    const layout = () => {
      markLaneRows();
      layoutWires();
    };
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(stage);
    lanes.forEach((lane) => observer.observe(lane));
    document.fonts?.ready.then(layout);
    return () => observer.disconnect();
  }, [language]);

  return (
    <div className="stage" id="portes" ref={stageRef} data-active={active ?? undefined}>
      <svg className="wires" aria-hidden="true" focusable="false">
        <path className="w w-stub" pathLength={1} />
        <path className="w w-a" pathLength={1} />
        <path className="w w-b" pathLength={1} />
        <path className="w lit lit-stub" pathLength={1} />
        <path className="w lit lit-a" pathLength={1} />
        <path className="w lit lit-b" pathLength={1} />
        <circle className="port port-a" r={4.5} />
        <circle className="port port-b" r={4.5} />
      </svg>
      <div className="hub" aria-hidden="true">
        <Mark className="hub-mark" width={34} />
      </div>
      {DOORS.map((door) => (
        <article
          key={door.key}
          className="door"
          data-door={door.key}
          data-state={active === door.key ? "active" : undefined}
          aria-labelledby={`door-${door.key}`}
          onPointerEnter={(e) => {
            if (e.pointerType !== "touch") setHovered(door.key);
          }}
          onPointerLeave={() => setHovered((key) => (key === door.key ? null : key))}
          onFocus={(e) => {
            if ((e.target as HTMLElement).matches(":focus-visible")) setFocused(door.key);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused((key) => (key === door.key ? null : key));
          }}
        >
          <Link className="door-hit" href={door.href} tabIndex={-1} aria-hidden="true" />
          <h2 className="door-title" id={`door-${door.key}`}>
            <T en={door.title.en} fr={door.title.fr} />
          </h2>
          <p className="door-q">
            <T en={door.question.en} fr={door.question.fr} />
          </p>
          <ol className="lane">
            {door.steps.map((step, index) => (
              <li key={step.en} style={{ ["--n" as string]: index }}>
                <i aria-hidden="true" />
                <T en={step.en} fr={step.fr} />
              </li>
            ))}
          </ol>
          <Cta href={door.href} size="lg" arrow="right" className="door-cta">
            <T en={door.cta.en} fr={door.cta.fr} />
          </Cta>
        </article>
      ))}
    </div>
  );
}
