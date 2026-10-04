"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/* Les trois marques, Darix, MicePro et 6WAY, en une rangée sobre posée sur le
   fond, sans panneau ni légende, équilibrées à l'œil (la plus petite lettre,
   DARIX, est la plus large). À partir de md, la rangée entre alignée à droite
   de la colonne et finit alignée à gauche : la largeur libre de la colonne est
   sa course, chaque marque y ajoute sa propre vitesse. Sur téléphone, les
   marques occupent la largeur et ne font que dériver. Immobile sous
   prefers-reduced-motion. Les fiches en dessous nomment les sociétés. */
const MARKS: Array<{ key: string; src: string; alt: { en: string; fr: string }; width: number; height: number; className: string; imgClassName?: string; drift: "near" | "mid" | "far" }> = [
  {
    key: "darix",
    src: "/portfolio/darix-mark.png",
    alt: { en: "Darix mark, the owl above the word DARIX", fr: "Marque Darix, la chouette au-dessus du mot DARIX" },
    width: 1920,
    height: 1560,
    className: "w-[80px] md:w-[140px]",
    drift: "near",
  },
  {
    key: "micepro",
    src: "/portfolio/micepro-logo.png",
    alt: { en: "MicePro logo", fr: "Logo MicePro" },
    width: 2560,
    height: 967,
    className: "w-[120px] md:w-[210px]",
    imgClassName: "grayscale",
    drift: "far",
  },
  {
    key: "6way",
    src: "/portfolio/6way-wordmark.png",
    alt: { en: "6WAY wordmark", fr: "Marque 6WAY" },
    width: 1600,
    height: 276,
    className: "w-[92px] md:w-[160px]",
    drift: "mid",
  },
];

export function ProofStrip() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  // Sur téléphone la rangée occupe déjà la largeur : les dérives sont réduites
  // pour que la dernière marque ne dépasse jamais le bord de l'écran.
  const [driftScale, setDriftScale] = useState(1);

  // La course de la rangée : la largeur de la colonne moins celle des marques,
  // à partir de md seulement. Mesurée au montage et à chaque redimensionnement.
  useEffect(() => {
    const measure = () => {
      const wrap = ref.current;
      const row = rowRef.current;
      if (!wrap || !row) return;
      const styles = getComputedStyle(wrap);
      const inner = wrap.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      const md = window.matchMedia("(min-width: 768px)").matches;
      setTravel(md ? Math.max(0, inner - row.offsetWidth) : 0);
      setDriftScale(md ? 1 : 0.35);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowX = useTransform(scrollYProgress, [0, 1], [travel, 0]);
  const near = useTransform(scrollYProgress, [0, 1], [24 * driftScale, -16 * driftScale]);
  const mid = useTransform(scrollYProgress, [0, 1], [40 * driftScale, -28 * driftScale]);
  const far = useTransform(scrollYProgress, [0, 1], [56 * driftScale, -40 * driftScale]);
  const driftFor = { near, mid, far };

  return (
    <div ref={ref} className="-mx-6 overflow-hidden px-6 py-6 md:-mx-10 md:px-10 md:py-10">
      <motion.div ref={rowRef} style={{ x: reduce ? 0 : rowX }} className="flex w-max items-center gap-x-6 will-change-transform md:gap-x-20 lg:gap-x-24">
        {MARKS.map((mark) => (
          <motion.figure key={mark.key} style={{ x: reduce ? 0 : driftFor[mark.drift] }} className={`shrink-0 will-change-transform ${mark.className}`}>
            <Image
              src={mark.src}
              alt={language === "fr" ? mark.alt.fr : mark.alt.en}
              width={mark.width}
              height={mark.height}
              sizes="(min-width: 768px) 210px, 120px"
              className={`h-auto w-full ${mark.imgClassName ?? ""}`}
            />
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}
