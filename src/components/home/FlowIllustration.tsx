import { T } from "@/components/Bilingual";
import { Mark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { DOORS, type DoorKey } from "@/components/home/DoorBands";

/* L'illustration du premier écran : From 6 est le point d'où partent deux
   voies nommées. En haut la chaîne Lead-to-Cash des entreprises (Devis,
   Contrat, Facture, Encaissement), en bas les quatre formes d'appui aux
   fondateurs. Dessinée en code, dans la palette : filets acier, points encre,
   étiquettes ; un point parcourt chaque voie en continu. La voie survolée
   passe en Signal, l'autre s'efface. Sur téléphone, les deux voies deviennent
   deux colonnes sous le hub. Décorative pour les lecteurs d'écran : les
   bandes portent le sens. */
export function FlowIllustration({ active, className }: { active: DoorKey | null; className?: string }) {
  return (
    <div className={cn("flow", className)} data-active={active ?? undefined} aria-hidden="true">
      <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-8">
        <div className="relative">
          <div className="flow-hub flex h-12 w-12 items-center justify-center rounded-full border border-muted-foreground/60 bg-background text-foreground md:h-[72px] md:w-[72px]">
            <Mark width={22} className="md:hidden" />
            <Mark width={32} className="hidden md:block" />
          </div>
          {/* Amorce du hub vers la barre de dérivation : vers le bas sur
              téléphone, vers la droite à partir de md. */}
          <span className="flow-stub absolute left-1/2 top-full h-9 w-px -translate-x-1/2 bg-muted-foreground md:left-full md:top-1/2 md:h-px md:w-8 md:translate-x-0 md:-translate-y-1/2" />
        </div>

        <div className="relative w-full md:pl-8">
          {/* Barre de dérivation reliant les deux voies. */}
          <span className="flow-branch absolute left-[6px] right-[calc(50%-6px)] top-5 h-px bg-muted-foreground md:bottom-[33px] md:left-0 md:right-auto md:top-[26px] md:h-auto md:w-px" />
          <span className="flow-branch-h hidden bg-muted-foreground md:absolute md:left-0 md:top-[26px] md:block md:h-px md:w-8" />
          <span className="flow-branch-h hidden bg-muted-foreground md:absolute md:bottom-[33px] md:left-0 md:block md:h-px md:w-8" />

          <div className="grid grid-cols-2 gap-6 md:flex md:flex-col md:gap-14">
            {DOORS.map((door, laneIndex) => {
              const state = active === door.key ? "active" : undefined;
              return (
                <div key={door.key} className="flow-lane relative pt-5" data-lane={door.key} data-state={state} style={{ ["--lane" as string]: laneIndex }}>
                  <span className="flow-name label absolute left-0 top-0 whitespace-nowrap text-muted-foreground">
                    <T en={door.title.en} fr={door.title.fr} />
                  </span>
                  <span className="flow-rail absolute bottom-0 left-[6px] top-5 w-px bg-muted-foreground md:bottom-auto md:left-0 md:right-0 md:top-[26px] md:h-px md:w-auto" />
                  <span className="flow-dot absolute top-[23px] hidden h-[7px] w-[7px] rounded-full bg-foreground md:block" />
                  <ol className="relative flex flex-col gap-2.5 md:flex-row md:items-start md:justify-between md:gap-0">
                    {door.steps.map((step, i) => {
                      const edge = i === 0 ? "md:items-start md:text-left" : i === door.steps.length - 1 ? "md:items-end md:text-right" : "md:items-center md:text-center";
                      return (
                        <li key={step.en} className={cn("flex items-center gap-3 md:flex-col md:gap-2.5", edge)} style={{ ["--i" as string]: i }}>
                          <span className="flow-node block h-[13px] w-[13px] shrink-0 rounded-full border-2 border-background bg-foreground" />
                          <span className="flow-label whitespace-nowrap text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground md:text-[0.6875rem] md:tracking-[0.05em]">
                            <T en={step.en} fr={step.fr} />
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
