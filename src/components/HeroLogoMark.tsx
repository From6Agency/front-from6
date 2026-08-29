"use client";

import { motion } from "motion/react";

// Révélation du vrai logo (public/brand/logo-f6a.png), pas une
// interprétation dessinée à main levée : un masque en forme de trait de
// feutre balaie l'image en 2-3 passages fluides et dévoile les pixels
// réels du monogramme au fur et à mesure. Le rendu final est donc
// pixel pour pixel la marque officielle — seule la révélation est animée.
const SWEEP = { ease: [0.45, 0, 0.2, 1] as const };

export function HeroLogoMark() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-10">
      <svg viewBox="0 0 1024 1024" className="h-auto w-full max-w-[420px]">
        <defs>
          <mask id="f6a-reveal" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1024" height="1024" fill="black" />
            <motion.path
              d="M 300,260 C 340,340 360,430 365,520 C 368,570 370,600 372,585"
              stroke="#ffffff"
              strokeWidth={170}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...SWEEP, duration: 1.1, delay: 0 }}
            />
            <motion.path
              d="M 300,300 C 420,270 520,268 610,300"
              stroke="#ffffff"
              strokeWidth={150}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...SWEEP, duration: 0.7, delay: 1.0 }}
            />
            <motion.path
              d="M 560,270 C 500,360 460,440 448,520 C 440,580 470,625 525,622 C 585,618 615,565 605,505 C 596,452 545,420 495,435"
              stroke="#ffffff"
              strokeWidth={175}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...SWEEP, duration: 1.3, delay: 1.75 }}
            />
            <motion.circle
              cx={700}
              cy={585}
              r={70}
              fill="#ffffff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, delay: 3.15 }}
              style={{ transformOrigin: "700px 585px" }}
            />
          </mask>
        </defs>

        <image href="/brand/logo-f6a.png" x="0" y="0" width="1024" height="1024" mask="url(#f6a-reveal)" />
      </svg>
    </div>
  );
}
