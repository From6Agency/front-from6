"use client";

import { motion } from "motion/react";

// Monogramme "F 6 A" (From 6 Agency) tracé au trait fin, façon plume —
// un stroke continu et fluide plutôt que des blocs épais, dans l'esprit du
// hibou Darix mais avec une calligraphie plus légère. Se dessine lettre
// par lettre, point final en dernier.
const DRAW = { duration: 0.85, ease: [0.65, 0, 0.35, 1] as const };
const STROKE = 5;

export function HeroLogoMark() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-10">
      <svg viewBox="0 0 920 400" className="h-auto w-full max-w-[380px]">
        {/* F */}
        <motion.path
          d="M 50,370 C 46,260 44,150 52,32 C 110,26 150,24 198,26"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.9}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, delay: 0 }}
        />
        <motion.path
          d="M 55,195 C 92,188 122,186 155,188"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.9}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 0.5, delay: 0.7 }}
        />

        {/* 6 */}
        <motion.path
          d="M 400,40 C 330,120 288,210 278,290 C 271,347 305,378 350,373 C 398,368 424,330 420,282 C 416,236 380,208 335,214 C 305,218 283,238 276,268"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.9}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.3, delay: 1.15 }}
        />

        {/* A */}
        <motion.path
          d="M 520,372 C 562,258 600,146 632,30 C 668,144 702,258 738,372"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.9}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 1.05, delay: 2.4 }}
        />
        <motion.path
          d="M 558,248 C 600,241 646,241 696,248"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.9}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...DRAW, duration: 0.5, delay: 3.35 }}
        />

        {/* point, en bas du A, à la toute fin */}
        <motion.circle
          cx={770}
          cy={372}
          r={13}
          fill="#ffffff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 3.9 }}
        />
      </svg>
    </div>
  );
}
