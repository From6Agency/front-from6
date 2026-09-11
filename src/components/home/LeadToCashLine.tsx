import { T } from "@/components/Bilingual";
import { cn } from "@/lib/utils";

const STATIONS = [
  { en: "Quote", fr: "Devis" },
  { en: "Contract", fr: "Contrat" },
  { en: "Invoice", fr: "Facture" },
  { en: "Cash", fr: "Encaissement" },
];

/* Le Lead-to-Cash, la spécialité de Franck, tracé sous le titre : une ligne
   se dessine de gauche à droite et allume quatre repères au passage. */
export function LeadToCashLine({ delay = 500 }: { delay?: number }) {
  const drawMs = 1200;
  return (
    <div className="relative mt-10 max-w-xl" aria-hidden="true">
      <div className="absolute left-0 right-0 top-[5px] h-px bg-hero-line anim-line" style={{ ["--delay" as string]: `${delay}ms` }} />
      <ol className="relative grid grid-cols-4">
        {STATIONS.map((station, i) => {
          const at = delay + (drawMs * (i + 0.5)) / STATIONS.length;
          return (
            <li key={station.en} className="flex flex-col items-start gap-2.5">
              <span
                className={cn("block h-[11px] w-[11px] rounded-full border-2 border-hero-bg anim-dot", i === STATIONS.length - 1 ? "bg-signal-soft" : "bg-hero-fg")}
                style={{ ["--delay" as string]: `${at}ms` }}
              />
              <span className="label text-hero-steel anim-fade" style={{ ["--delay" as string]: `${at + 80}ms` }}>
                <T en={station.en} fr={station.fr} />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
