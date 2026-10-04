"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/Bilingual";
import { Button } from "@/components/ui";

/* Sur téléphone, les deux portes restent sous le pouce : barre ancrée en bas
   de la home, une action par parcours, visible dès le premier affichage quand
   les bandes sont sous le pli. Elle se range pendant que les bandes sont à
   l'écran (pas de doublon) et revient ensuite. Disparaît à partir de lg, où
   les bandes tiennent seules. */
export function MobileDoorBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const doors = document.querySelector(".doors");
    if (!doors) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(doors);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="door-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden"
      data-visible={visible ? "true" : "false"}
      aria-label="Parcours"
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button href="/diagnostic" className="!h-11 !px-3 !text-sm">
          <T en="Companies" fr="Entreprises" />
        </Button>
        <Button href="/proposer-un-projet" variant="outline" className="!h-11 !px-3 !text-sm">
          <T en="Founders" fr="Fondateurs" />
        </Button>
      </div>
    </nav>
  );
}
