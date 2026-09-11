"use client";

import { useState, type ReactNode } from "react";

type Door = "companies" | "founders";

/* Survol ou focus d'une porte (data-door) : l'autre recule, via l'attribut
   data-door-hover lu par le CSS. Sans script, les deux portes restent égales. */
export function DoorPair({ children, className }: { children: ReactNode; className?: string }) {
  const [hover, setHover] = useState<Door | null>(null);
  const doorOf = (target: EventTarget | null) => (target as HTMLElement | null)?.closest?.<HTMLElement>("[data-door]")?.dataset.door as Door | undefined;

  return (
    <div
      className={className}
      data-door-hover={hover ?? undefined}
      onPointerOver={(e) => {
        const door = doorOf(e.target);
        if (door) setHover(door);
      }}
      onPointerLeave={() => setHover(null)}
      onFocusCapture={(e) => {
        const door = doorOf(e.target);
        if (door) setHover(door);
      }}
      onBlurCapture={() => setHover(null)}
    >
      {children}
    </div>
  );
}
