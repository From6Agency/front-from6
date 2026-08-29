"use client";

import { motion } from "motion/react";

// Courbe de croissance animée : la ligne se dessine, la surface sous la
// courbe se remplit, quelques points de données apparaissent en séquence.
// Écho direct au positionnement (accompagner des entreprises en
// croissance) plutôt qu'une illustration décorative — et purement
// géométrique, donc fiable à animer (contrairement à un tracé de logo).
// Pas de wrapper propre (bordure/fond) : ce composant vit à l'intérieur
// du même bloc que le texte du hero, pas dans une carte séparée.
const CURVE = "M 20,222 C 80,212 96,182 140,176 C 182,170 190,140 230,120 C 270,100 282,132 312,100 C 344,66 364,58 420,26";
const AREA = `${CURVE} L 420,240 L 20,240 Z`;
const DOTS = [
  { cx: 140, cy: 176, delay: 0.55 },
  { cx: 230, cy: 120, delay: 0.95 },
  { cx: 312, cy: 100, delay: 1.3 },
  { cx: 420, cy: 26, delay: 1.65 },
];

export function HeroGrowthChart() {
  return (
    <svg viewBox="0 0 440 260" className="h-full w-full" preserveAspectRatio="none">
      {[40, 100, 160, 220].map((y) => (
        <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="#ffffff" strokeOpacity={0.07} strokeWidth={1} />
      ))}

      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.16} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <motion.path
        d={AREA}
        fill="url(#growth-fill)"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      <motion.path
        d={CURVE}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.9}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      />

      {DOTS.map((d) => (
        <motion.circle
          key={`${d.cx}-${d.cy}`}
          cx={d.cx}
          cy={d.cy}
          r={5}
          fill="#ffffff"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: d.delay }}
          style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
        />
      ))}
    </svg>
  );
}
