"use client";

import { motion } from "motion/react";

// Révélation typographique plutôt qu'un tracé de l'icône "F6." : le PNG
// source de l'icône est trop dégradé (grain façon compression, pas de
// vecteur propre) pour en tirer un contour net à animer. La typographie,
// elle, est garantie nette quelle que soit la résolution — registre plus
// sobre, plus "family office", et sans le risque d'un rendu bruité.
const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroLogoMark() {
  return (
    <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-10 text-center">
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(6px)" }}
        animate={{ opacity: 1, letterSpacing: "-0.02em", filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        className="text-5xl font-medium text-hero-fg md:text-6xl"
      >
        FROM 6
      </motion.div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
        style={{ transformOrigin: "center" }}
        className="my-5 h-px w-24 bg-hero-fg/40"
      />

      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.1em", y: 6 }}
        animate={{ opacity: 1, letterSpacing: "0.35em", y: 0 }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
        className="text-xs font-medium uppercase text-hero-fg/60 md:text-sm"
      >
        Agency
      </motion.div>
    </div>
  );
}
