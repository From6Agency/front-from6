"use client";

import { useState, type ReactNode } from "react";
import { DoorBands, type DoorKey } from "@/components/home/DoorBands";
import { FlowIllustration } from "@/components/home/FlowIllustration";

const delay = (ms: number) => ({ ["--delay" as string]: `${ms}ms` });

/* Le premier écran : à gauche le titre et sa phrase (rendus côté serveur et
   passés en enfants), à droite l'illustration des deux voies, puis les deux
   portes. Un seul état partagé : la porte survolée allume sa voie. */
export function HeroDoors({ intro }: { intro: ReactNode }) {
  const [active, setActive] = useState<DoorKey | null>(null);

  return (
    <>
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div>{intro}</div>
        {/* Le schéma n'existe qu'à partir de md : sur téléphone, les deux
            bandes portent seules le premier écran. */}
        <div className="anim-rise hidden md:block lg:pl-4" style={delay(260)}>
          <FlowIllustration active={active} />
        </div>
      </div>
      <div className="anim-rise" style={delay(420)}>
        <DoorBands active={active} onActive={setActive} className="mt-8 md:mt-12" />
      </div>
    </>
  );
}
