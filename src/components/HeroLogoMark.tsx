"use client";

import { motion } from "motion/react";

// Monogramme "F6A" resserré et imbriqué (comme le vrai logo, où le F et le 6
// partagent le même espace vertical) plutôt que trois lettres espacées façon
// écriture manuscrite. Trait fin continu, façon plume, qui se dessine lettre
// par lettre.
const DRAW = { duration: 0.85, ease: [0.65, 0, 0.35, 1] as const };
const STROKE = 6;

export function HeroLogoMark() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-10">
      <svg viewBox="0 0 520 460" className="h-auto w-full max-w-[280px]">
        {/* F : hampe verticale + barre haute + barre médiane, resserrée */}
        <motion.path
          d="M 46,430 C 42,300 40,168 48,32 C 96,26 128,24 168,26"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.92}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, delay: 0 }}
        />
        <motion.path
          d="M 50,225 C 84,219 110,217 138,219"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.92}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 0.45, delay: 0.65 }}
        />

        {/* 6 : la hampe plonge juste derrière la barre du F, la boucle vient
            chevaucher la jambe gauche du A */}
        <motion.path
          d="M 268,40 C 210,120 176,215 172,290 C 168,352 202,388 250,382 C 300,376 326,336 320,286 C 314,238 276,208 230,216 C 198,222 176,244 170,276"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.92}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.25, delay: 1.05 }}
        />

        {/* A : la jambe gauche traverse la boucle du 6, resserrée contre lui */}
        <motion.path
          d="M 258,432 C 310,300 360,168 404,30 C 424,168 442,300 462,432"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.92}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.05, delay: 2.25 }}
        />
        <motion.path
          d="M 300,288 C 340,282 380,282 424,288"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.92}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 0.45, delay: 3.2 }}
        />

        {/* point, sous le A, à la toute fin */}
        <motion.circle
          cx={480}
          cy={432}
          r={14}
          fill="#ffffff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 3.7 }}
        />
      </svg>
    </div>
  );
}
