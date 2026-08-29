"use client";

import { motion } from "motion/react";

// Trait d'art dérivé du monogramme FROM 6 AGENCY (le "F6." de
// public/brand/logo-f6a.png) plutôt qu'une forme géométrique abstraite —
// même principe que le hibou de Darix : la marque se dessine une fois à
// l'arrivée sur la page.
const DRAW = { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const };

export function HeroLogoMark() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-10">
      <svg viewBox="0 0 400 440" className="h-auto w-full max-w-[240px]">
        {/* F : barre verticale */}
        <motion.path
          d="M 70,80 L 70,360 M 70,80 L 170,80 M 70,205 L 150,205"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.85}
          strokeWidth={26}
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.1, delay: 0 }}
        />

        {/* 6 : hampe diagonale qui plonge dans la boucle */}
        <motion.path
          d="M 320,80 L 210,240"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.85}
          strokeWidth={26}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, delay: 0.5 }}
        />
        <motion.circle
          cx={225}
          cy={300}
          r={75}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.85}
          strokeWidth={26}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.1, delay: 0.85 }}
        />

        {/* point final */}
        <motion.circle
          cx={345}
          cy={368}
          r={17}
          fill="#ffffff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 1.9 }}
        />
      </svg>
    </div>
  );
}
