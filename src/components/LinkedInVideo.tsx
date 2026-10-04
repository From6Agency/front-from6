"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/* Aperçu d'une publication LinkedIn (vidéo) directement dans la page. L'embed
   LinkedIn dépose des cookies tiers : il se charge tout seul seulement si les
   cookies ont été acceptés, sinon un cadre invite à lancer la lecture (le clic
   vaut accord pour cet embed). L'URL d'embed est dérivée de l'identifiant de la
   publication contenu dans le lien partagé. */
function embedUrl(postUrl: string) {
  const m = postUrl.match(/(ugcPost|activity|share)[-:](\d{10,})/);
  if (!m) return null;
  const kind = m[1] === "activity" ? "activity" : m[1];
  return `https://www.linkedin.com/embed/feed/update/urn:li:${kind}:${m[2]}`;
}

export function LinkedInVideo({ url, title }: { url: string; title: string }) {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const src = embedUrl(url);

  useEffect(() => {
    const sync = () => {
      try {
        if (localStorage.getItem("cookie-consent") === "accepted") setLoaded(true);
      } catch {}
    };
    sync();
    window.addEventListener("cookie-consent-changed", sync);
    return () => window.removeEventListener("cookie-consent-changed", sync);
  }, []);

  if (!src) return null;

  if (loaded) {
    return <iframe src={src} title={title} loading="lazy" allowFullScreen className="h-[560px] w-full max-w-[504px] border border-border bg-background" />;
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex aspect-[4/3] w-full max-w-[504px] flex-col items-center justify-center gap-4 border border-border bg-background p-6 text-center transition-colors hover:border-foreground"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal text-white transition-colors group-hover:bg-foreground">
        <Play className="ml-1 h-6 w-6" strokeWidth={2} fill="currentColor" aria-hidden="true" />
      </span>
      <span className="text-base font-medium">{language === "fr" ? "Lire la vidéo" : "Play the video"}</span>
      <span className="max-w-xs text-sm text-muted-foreground">
        {language === "fr" ? "La vidéo est publiée sur LinkedIn : la lire charge leur lecteur." : "The video is published on LinkedIn: playing it loads their player."}
      </span>
    </button>
  );
}
