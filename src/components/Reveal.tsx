"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useVariants(effect: "rise" | "photo"): Variants {
  const reduce = useReducedMotion();
  if (reduce) return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  if (effect === "photo") return { hidden: { opacity: 0, scale: 1.04 }, visible: { opacity: 1, scale: 1 } };
  return { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
}

/* Apparition à l'entrée dans l'écran, une seule fois. */
export function Reveal({
  children,
  delay = 0,
  className,
  effect = "rise",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  effect?: "rise" | "photo";
}) {
  const variants = useVariants(effect);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: effect === "photo" ? 0.9 : 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Une liste qui arrive comme une liste : cascade courte et bornée. */
export function RevealGroup({ children, className, stagger = 0.07 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const variants = useVariants("rise");
  return (
    <motion.div className={className} variants={variants} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </motion.div>
  );
}
