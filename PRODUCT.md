# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences carry equal weight on the home page (confirmed 2026-09-10):

1. **Company leaders** (CEO, COO, CRO, CFO of B2B companies, often SaaS, often on Salesforce) whose revenue systems slow them down: complex quotes, unreliable billing, double data entry, disconnected CRM/ERP/billing, data nobody trusts. Their job on the site: understand whether this is the right place to bring the problem, and take a first step without having a specification ready. They are routed to Darix for execution.
2. **Founders** of early-stage B2B SaaS, vertical software or applied-AI companies looking for an investor who still operates, or for hands-on support (advisory, operational involvement, partnership or co-founding). Their job: present the company, its stage and the help sought, without a deck or revenue being mandatory.

Secondary audience: media and event organisers (podcasts, talks, partnerships), served through the contact page.

## Product Purpose

from6agency.com is the entrepreneurial platform of Franck Berthelot. It exists to turn visits into qualified conversations of two kinds: a Darix engagement on revenue systems, or an investment / support discussion with a founder. Success is the number of relevant requests and their progression to a Darix mission or an investment exchange, not raw email collection.

The site presents problems leaders face, gives a first orientation, and qualifies the need. Detailed technical offers and delivery case studies live on darix.io; From 6 must not become a second Salesforce services catalogue competing with Darix in search.

## Positioning

**An operator who invests.** Franck still builds companies himself (co-founder of Darix and 6WAY) and invests in others (MicePro). Advice and capital come from someone who operates today, not from a consulting firm or a fund. Neighbouring products cannot truthfully claim both sides at once.

Franck's own specialty is Lead-to-Cash / Quote-to-Cash on Salesforce (CPQ, Revenue Cloud, billing, integrations); his path runs finance, then Salesforce architecture, then entrepreneurship.

## Operating Context

- **Darix** (darix.io, co-founded by Franck) is the operational team. Its current offer, as published in the darix repo (`src/lib/siteNav.ts`), is six lines: Advisory (Salesforce audits, architecture, roadmap), Quote-to-Cash (CPQ, Revenue Cloud Advanced, billing), Delivery (architect-led Salesforce implementation), Integrations (Salesforce with ERP, billing, data platforms), Service Excellence (Service Cloud, Field Service), Augmented Intelligence (AI applied to Salesforce with guardrails). The From 6 company path must reflect this offer at summary level and send detail to darix.io. Open item: the six `advisory_services` rows in Supabase still describe the older From 6 catalogue and need re-editing in the admin to match.
- **Portfolio**: Darix (co-founder, active), MicePro (investor, active, micepro.io), 6WAY (co-founder, in build, 6way.app). Stored in Supabase `portfolio_companies`.
- **Conversion paths**: `/diagnostic` (3 steps, company need), `/proposer-un-projet` (3 steps, founder project), `/contact` (other requests), plus a cal.com 30-minute booking (`from6agency/30min`). Submissions land in Supabase `contact_submissions` and trigger an email to franck.berthelot@from6agency.com via the `send-contact-notification` edge function (Resend).
- **Content management**: editorial content (services, portfolio, bio, legal) is read from Supabase project `from6agency` (ref `qaxeszpfjpjzxlxhwmaq`) and edited in the existing Lovable admin; the site is read-only on that content and falls back to `src/lib/fallback-data.json` if the API is unreachable.
- **Media**: podcast Engrenages ep. 29, YouTube masterclass and interviews (see `featured_videos`), LinkedIn (personal and company pages).

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind v4, `motion`, deployed on Vercel (project `franckfrom6s-projects/front-from6`, manual `vercel deploy`).
- **Bilingual FR/EN, English rendered server-side by default** (crawlers see EN); French is a client-side switch persisted in localStorage. Every visible string ships as an EN/FR pair. French must be real business French (revenus, not "revenue"; concrètement, not "hands-on").
- Static generation at build time; content fetched once per deploy with a snapshot fallback.
- Public client uses the Supabase publishable key only; no service role in this repo. Forms insert into `contact_submissions` and upload optional decks to the private `pitch-decks` bucket (PDF, PPT, PPTX, DOC, DOCX, 10 MB max).
- Guides under `/ressources` are currently hardcoded in `src/lib/resources.ts`; the `articles` table exists but is empty.
- Undecided: where the private request inbox lives (existing Lovable admin vs a protected route here); whether Franck's photo stays a central element of the site.

## Brand Commitments

- Name: **FROM 6 AGENCY** (short form "From 6"). Mark: the F6A monogram in `public/brand/logo-f6a.png`. The current file is low quality; the user allows the mark to be modernised as part of a redesign, the name stays.
- **Editorial rules (binding on all visible copy, both languages):** no em dash or en dash (use comma, colon, parentheses; `|` in SEO titles); no poetic or advertising phrasing without verifiable content; no rhythmic triplets of words separated by periods; no emojis; no invented clients, figures, testimonials, certifications or investment criteria. Answer-first writing: the first sentence of a block answers its heading; headings phrased as real questions where natural; entities named explicitly (Salesforce, CPQ, Revenue Cloud, Darix). One subject per URL, internal links between sibling pages.
- Voice: direct, factual, first person singular where Franck speaks ("je"), professional and personal, French and English of equal quality.

## Evidence on Hand

- Portfolio companies with real roles and statuses (Supabase `portfolio_companies`, snapshot in `src/lib/fallback-data.json`).
- Investment thesis and typical check size, 10 to 50 k€ (`site_content` investments section).
- Podcast and video appearances with real URLs (`featured_videos`, `/media`).
- Franck's photo `public/brand/franck-profile.png`; podcast cover `public/brand/engrenages-ep29-cover.png`; OG image `public/og-from6.png`.
- Legal identity: FROM 6 AGENCY SAS, SIRET 940 540 008 00015, Paris.
- **Absent, must not be fabricated:** client names, testimonials, results, revenue figures, team size, number of projects, certifications.

## Product Principles

1. Two doors, equal weight: a leader with a systems problem and a founder with a project must each find their path within the first screen.
2. Qualify, do not catalogue: From 6 frames and orients; Darix executes. Depth on Salesforce delivery belongs to darix.io.
3. Proof is what exists: three real companies, a real trajectory, real recordings. Nothing invented stands in for evidence.
4. Answer first, in both languages: every block must be quotable out of context by a search or answer engine, in French and in English.
5. A request is only recorded when the server confirms it; no simulated success, and the notification failing never hides a saved request.
