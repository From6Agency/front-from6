"use client";

import { motion } from "motion/react";

// Formes douces, grayscale uniquement, qui dérivent lentement derrière
// plusieurs sections pour créer une continuité visuelle sans quadrillage
// ni bandes de couleur tranchées entre sections — dans l'esprit des sites
// Sonho (aubier-expertise, grille.fr) où le fond respire d'une section à
// l'autre plutôt que de se découper.
export function FloatingOrbs({ tone = "light" }: { tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "hsl(var(--hero-fg))" : "hsl(var(--foreground))";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-0 h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{ background: base, opacity: tone === "dark" ? 0.07 : 0.045 }}
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[30%] h-[480px] w-[480px] rounded-full blur-[100px]"
        style={{ background: base, opacity: tone === "dark" ? 0.06 : 0.035 }}
        animate={{ y: [0, -50, 0], x: [0, -25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[-10%] h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{ background: base, opacity: tone === "dark" ? 0.055 : 0.03 }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}
