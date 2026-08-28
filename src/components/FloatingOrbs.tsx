"use client";

import { motion } from "motion/react";

// Formes douces, grayscale uniquement, qui dérivent lentement derrière
// plusieurs sections pour créer une continuité visuelle sans quadrillage
// ni bandes de couleur tranchées entre sections — dans l'esprit des sites
// Sonho (aubier-expertise, grille.fr) où le fond respire d'une section à
// l'autre plutôt que de se découper.
export function FloatingOrbs({ tone = "light" }: { tone?: "light" | "dark" }) {
  // En clair : gris moyen (le foreground quasi-noir à faible opacité restait
  // imperceptible sur fond blanc). En sombre : blanc.
  const base = tone === "dark" ? "#ffffff" : "hsl(0 0% 45%)";
  const op = tone === "dark" ? [0.22, 0.16, 0.13] : [0.16, 0.12, 0.1];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-0 h-[560px] w-[560px] rounded-full blur-[90px]"
        style={{ background: base, opacity: op[0] }}
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[25%] h-[480px] w-[480px] rounded-full blur-[85px]"
        style={{ background: base, opacity: op[1] }}
        animate={{ y: [0, -60, 0], x: [0, -35, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute left-[15%] bottom-[-12%] h-[420px] w-[420px] rounded-full blur-[85px]"
        style={{ background: base, opacity: op[2] }}
        animate={{ y: [0, 40, 0], x: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
