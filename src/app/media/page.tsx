import type { Metadata } from "next";
import Image from "next/image";
import { Mic, PenLine, Users, Headphones, Play } from "lucide-react";
import { getFeaturedVideos, getMediaOpportunities } from "@/lib/content";
import { BookCallButton } from "@/components/BookCallButton";
import { T } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Media & Speaking",
  description: "Podcasts, articles, and speaking appearances by Franck Berthelot on B2B SaaS revenue, RevOps, and AI-powered go-to-market.",
  alternates: { canonical: "/media" },
};

const EPISODE_URL =
  "https://smartlink.ausha.co/engrenages/episode-29-le-role-du-revops-dans-les-entrailles-de-salesforce-le-decryptage-de-la-brique-cpq-franck-berthelot";

const MEDIA_TYPES = [
  {
    icon: Mic,
    title_en: "Podcasts",
    title_fr: "Podcasts",
    desc_en: "Guest appearances on B2B SaaS operations, revenue, and the systems behind scale.",
    desc_fr: "Interventions sur les opérations B2B SaaS, les revenus et les systèmes qui soutiennent la croissance.",
  },
  {
    icon: Users,
    title_en: "Interviews",
    title_fr: "Interviews",
    desc_en: "Media interviews and thought leadership on RevOps and Lead-to-Cash.",
    desc_fr: "Interviews médias et leadership d'opinion sur le RevOps et le Lead-to-Cash.",
  },
  {
    icon: PenLine,
    title_en: "Speaking",
    title_fr: "Conférences",
    desc_en: "Conference talks and panel discussions for go-to-market and finance leaders.",
    desc_fr: "Conférences et tables rondes pour les leaders go-to-market et finance.",
  },
];

function extractYouTubeId(url: string) {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export const revalidate = 900;

export default async function MediaPage() {
  const [videos, opportunities] = await Promise.all([getFeaturedVideos(), getMediaOpportunities()]);

  const mediaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PodcastEpisode",
        name: "Episode 29 — Inside Salesforce & CPQ: the RevOps decoder",
        url: EPISODE_URL,
        partOfSeries: { "@type": "PodcastSeries", name: "Engrenages" },
        description:
          "Franck Berthelot opens the hood on Salesforce and CPQ: why a Quote-to-Cash project is never just technical, where no-code stops, and how the RevOps hybrid profile becomes the real engine of transformation.",
        actor: { "@type": "Person", name: "Franck Berthelot" },
      },
      ...videos
        .map((video) => {
          const videoId = extractYouTubeId(video.youtube_url);
          if (!videoId) return null;
          return {
            "@type": "VideoObject",
            name: video.title,
            description: video.description,
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            uploadDate: video.created_at,
          };
        })
        .filter(Boolean),
    ],
  };

  return (
    <div className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 kicker text-muted-foreground">Media</p>
          <h1 className="mb-6 text-4xl font-medium md:text-5xl">
            <T en="Media & Speaking" fr="Media & Conférences" />
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            <T
              en="Available for podcasts, interviews, and speaking engagements on B2B SaaS, RevOps, Lead-to-Cash, and business architecture."
              fr="Disponible pour des podcasts, interviews et conférences sur le B2B SaaS, le RevOps, le Lead-to-Cash et l'architecture business."
            />
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {MEDIA_TYPES.map((item) => (
            <div key={item.title_en} className="rounded-xl border border-border bg-card p-6 text-center card-shadow hover-lift">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-medium">
                <T en={item.title_en} fr={item.title_fr} />
              </h3>
              <p className="text-sm text-muted-foreground">
                <T en={item.desc_en} fr={item.desc_fr} />
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-medium">
            <T en="Recent Appearances" fr="Apparitions récentes" />
          </h2>
          <div className="mx-auto max-w-4xl space-y-10">
            <section>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                <Mic className="h-4 w-4" />
                Podcast
              </h3>
              <article className="overflow-hidden rounded-2xl border border-border bg-card card-shadow">
                <div className="flex flex-col gap-5 p-5 sm:flex-row">
                  <div className="mx-auto w-full shrink-0 sm:mx-0 sm:w-40 md:w-48">
                    <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                      <Image
                        src="/brand/engrenages-ep29-cover.png"
                        alt="Engrenages podcast, episode 29 with Franck Berthelot"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <span className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Engrenages · par Julien Maslard</span>
                    <h3 className="mb-2 text-lg font-medium leading-tight md:text-xl">
                      <T
                        en="Episode 29 — Inside Salesforce & CPQ: the RevOps decoder"
                        fr="Épisode 29 — Le rôle du RevOps dans les entrailles de Salesforce, décryptage de la brique CPQ"
                      />
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      <T
                        en="Franck Berthelot opens the hood on Salesforce and CPQ: why a Quote-to-Cash project is never just technical, where no-code stops, and how the RevOps hybrid profile becomes the real engine of transformation."
                        fr="Franck Berthelot ouvre le capot de Salesforce et du CPQ : pourquoi un projet Quote-to-Cash n'est presque jamais technique, jusqu'où va le no-code, et comment le RevOps hybride devient le vrai moteur de la transformation."
                      />
                    </p>
                    <a
                      href={EPISODE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
                    >
                      <Headphones className="h-4 w-4" />
                      <T en="Listen to the episode" fr="Écouter l'épisode" />
                    </a>
                  </div>
                </div>
              </article>
            </section>

            {videos.length > 0 && (
              <section>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  <Play className="h-4 w-4" />
                  YouTube
                </h3>
                <div className="grid gap-8">
                  {videos.map((video) => {
                    const videoId = extractYouTubeId(video.youtube_url);
                    if (!videoId) return null;
                    return (
                      <article key={video.id} className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                        <div className="aspect-video w-full overflow-hidden rounded-2xl card-shadow">
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${videoId}?start=${video.start_seconds || 0}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-medium text-foreground">
                            <T en={video.title} fr={video.title_fr || video.title} />
                          </h3>
                          <p className="text-sm leading-7 text-muted-foreground">
                            <T en={video.description} fr={video.description_fr || video.description} />
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        {opportunities.length > 0 && (
          <div className="mb-12 rounded-2xl bg-muted/50 p-6">
            <h2 className="mb-6 text-center text-2xl font-medium">
              <T en="Invite us" fr="Invitez-nous" />
            </h2>
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <div key={opp.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="mb-1 font-medium">
                        <T en={opp.title} fr={opp.title_fr || opp.title} />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <T en={opp.description} fr={opp.description_fr || opp.description} />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-8 text-center card-shadow md:p-10">
          <h2 className="mb-4 text-2xl font-medium">
            <T en="Want us on your show or stage?" fr="Vous nous voulez sur votre podcast ou votre scène ?" />
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
            <T
              en="We're happy to share practical, no-fluff takes on revenue systems and how B2B SaaS companies actually scale."
              fr="Nous partageons volontiers des analyses concrètes et sans détour sur les systèmes de revenus et la manière dont les entreprises B2B SaaS scalent vraiment."
            />
          </p>
          <BookCallButton size="lg">
            <T en="Get in touch" fr="Nous contacter" />
          </BookCallButton>
        </div>
      </div>
    </div>
  );
}
