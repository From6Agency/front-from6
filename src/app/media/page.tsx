import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { getFeaturedVideos, getMediaOpportunities } from "@/lib/content";
import { T } from "@/components/Bilingual";
import { ArrowLink, Button, Page, PageHeader, Row, RowList, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Media & Speaking",
  description: "Podcasts, articles, and speaking appearances by Franck Berthelot on B2B SaaS revenue, RevOps, and AI-powered go-to-market.",
  alternates: { canonical: "/media" },
};

const EPISODE_URL =
  "https://smartlink.ausha.co/engrenages/episode-29-le-role-du-revops-dans-les-entrailles-de-salesforce-le-decryptage-de-la-brique-cpq-franck-berthelot";

function extractYouTubeId(url: string) {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default async function MediaPage() {
  const [videos, opportunities] = await Promise.all([getFeaturedVideos(), getMediaOpportunities()]);

  const mediaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PodcastEpisode",
        name: "Episode 29: le rôle du RevOps dans les entrailles de Salesforce, le décryptage de la brique CPQ",
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
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaJsonLd) }} />
      <PageHeader
        title={<T en="Opening the discussion on revenue systems." fr="Ouvrir la discussion sur les systèmes revenue." />}
        lead={
          <T
            en="Podcasts, masterclasses and interviews on Lead-to-Cash, Salesforce, RevOps and building B2B software companies. Each recording links to its source."
            fr="Podcasts, masterclass et interviews sur le Lead-to-Cash, Salesforce, le RevOps et la construction d'entreprises B2B. Chaque enregistrement renvoie à sa source."
          />
        }
      />

      <Section>
        <SectionHeader title="Podcast" />
        <a href={EPISODE_URL} target="_blank" rel="noopener noreferrer" className="group grid gap-6 border border-border bg-card p-5 transition-colors hover:border-foreground/40 sm:grid-cols-[180px_1fr] sm:p-6">
          <div className="overflow-hidden">
            <Image src="/brand/engrenages-ep29-cover.png" alt="Engrenages podcast, episode 29 with Franck Berthelot" width={360} height={360} className="aspect-square w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="label text-muted-foreground">Engrenages · Julien Maslard</p>
            <h3 className="mt-2 text-xl leading-snug">
              <T
                en="Episode 29: the role of RevOps inside Salesforce, decoding the CPQ layer"
                fr="Épisode 29 : le rôle du RevOps dans les entrailles de Salesforce, décryptage de la brique CPQ"
              />
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
              <T
                en="Why a Quote-to-Cash project is never only technical, where no-code stops, and how the hybrid RevOps profile becomes the engine of a transformation."
                fr="Pourquoi un projet Quote-to-Cash n'est jamais seulement technique, où s'arrête le no-code, et comment le profil hybride RevOps devient le moteur d'une transformation."
              />
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
              <T en="Listen to episode 29" fr="Écouter l'épisode 29" />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </span>
          </div>
        </a>
      </Section>

      <Section>
        <SectionHeader title={<T en="Video" fr="Vidéo" />} />
        <div className="divide-y divide-border border-y border-border">
          {videos.map((video) => {
            const videoId = extractYouTubeId(video.youtube_url);
            const href = video.start_seconds ? `${video.youtube_url}&t=${video.start_seconds}s` : video.youtube_url;
            return (
              <a key={video.id} href={href} target="_blank" rel="noopener noreferrer" className="group grid gap-5 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                {videoId && (
                  <div className="overflow-hidden bg-muted">
                    <Image src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="" width={480} height={360} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg leading-snug">
                    <T en={video.title} fr={video.title_fr || video.title} />
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    <T en={video.description} fr={video.description_fr || video.description} />
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                    <PlayCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    <T en="Watch on YouTube" fr="Regarder sur YouTube" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </Section>

      {opportunities.length > 0 && (
        <Section>
          <SectionHeader title={<T en="Available for" fr="Disponible pour" />} />
          <RowList>
            {opportunities.map((opp) => (
              <Row key={opp.id} term={<T en={opp.title} fr={opp.title_fr || opp.title} />}>
                <T en={opp.description} fr={opp.description_fr || opp.description} />
              </Row>
            ))}
          </RowList>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/contact">
              <T en="Propose a talk or a podcast" fr="Proposer une intervention" />
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Button>
            <ArrowLink href="/ressources">
              <T en="Read the guides" fr="Lire les guides" />
            </ArrowLink>
          </div>
        </Section>
      )}
    </Page>
  );
}
