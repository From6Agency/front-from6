-- FROM 6 AGENCY — reconstruction du schema apres suppression du projet
-- Supabase original. A executer en une fois dans SQL Editor (nouveau projet
-- qaxeszpfjpjzxlxhwmaq, vide). Idempotent si le projet est bien vide.

create extension if not exists pgcrypto;

create type app_role as enum ('admin', 'editor');
create type article_category as enum ('insights', 'case_studies', 'founder_notes');

create table public.advisory_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_fr text not null,
  description text not null,
  description_fr text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  description_fr text not null,
  logo_url text,
  website_url text,
  display_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  role text,
  tags text[],
  stage_year text,
  my_role text,
  status text,
  project_video_url text
);

create table public.media_opportunities (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  title_fr text not null,
  description text not null,
  description_fr text not null,
  organization text,
  organization_fr text,
  date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true
);

create table public.featured_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_fr text not null,
  youtube_url text not null,
  start_seconds integer default 0,
  display_order integer default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  description text not null default '',
  description_fr text not null default ''
);

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  content_en text not null,
  content_fr text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  image_url text,
  image_settings jsonb,
  unique (section, key)
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  document_url text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  category article_category not null,
  title text not null,
  title_fr text not null,
  slug text not null unique,
  excerpt text not null,
  excerpt_fr text not null,
  content text not null,
  content_fr text not null,
  featured_image text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.site_secrets (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role app_role not null,
  unique (user_id, role)
);

-- Row Level Security : lecture publique du contenu publie, ecriture publique
-- uniquement pour deposer une demande de contact. Tout le reste (site_secrets,
-- user_roles, ecriture sur le contenu editorial) reste reserve au service_role,
-- donc a l'admin Lovable qui l'utilise deja.

alter table public.advisory_services enable row level security;
alter table public.portfolio_companies enable row level security;
alter table public.media_opportunities enable row level security;
alter table public.featured_videos enable row level security;
alter table public.site_content enable row level security;
alter table public.articles enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.site_secrets enable row level security;
alter table public.user_roles enable row level security;

create policy "public read published" on public.advisory_services for select using (published = true);
create policy "public read published" on public.portfolio_companies for select using (published = true);
create policy "public read published" on public.media_opportunities for select using (published = true);
create policy "public read published" on public.featured_videos for select using (published = true);
create policy "public read published" on public.site_content for select using (published = true);
create policy "public read published" on public.articles for select using (published = true);
create policy "public can submit" on public.contact_submissions for insert with check (true);

-- Stockage des pieces jointes (deck / diagnostic), prive, upload public.
insert into storage.buckets (id, name, public)
values ('pitch-decks', 'pitch-decks', false)
on conflict (id) do nothing;

create policy "anon can upload pitch decks" on storage.objects
  for insert to anon
  with check (bucket_id = 'pitch-decks');

-- advisory_services
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('2c2da629-e596-441b-a660-4fb8dd838b02', 'Platform Audit', 'Audit Plateforme', 'Diagnostic of your Marketing, CRM (Salesforce), CPQ, and billing setup and integrations. Outcome: a clear map of your stack and where it''s costing you revenue.', 'Diagnostic de votre setup Marketing, CRM (Salesforce), CPQ, facturation et intégrations. Résultat : une cartographie claire de votre stack et des endroits où elle vous coûte du revenue.', 1, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('b733a3e0-b00b-4917-822a-777ab5435d53', 'Process Audit', 'Audit Processus', 'Analysis of your sales, finance, and lead-to-cash workflows. Outcome: friction points identified, with a prioritized plan to remove them.', 'Analyse de vos workflows sales, finance et lead-to-cash. Résultat : points de friction identifiés, avec un plan priorisé pour les supprimer.', 2, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('0f77491d-c58c-453c-ac7f-8fb99b09e4c5', 'Revenue Operations Advisory', 'Advisory Lead-to-Cash', 'Strategic advisory for revenue platform optimization. Outcome: a RevOps roadmap aligned to how you actually sell and bill.', 'Advisory stratégique pour l''optimisation de votre plateforme revenue. Résultat : une roadmap RevOps alignée sur la façon dont vous vendez et facturez réellement.', 3, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('c0edba09-3a4c-4ed0-8b89-2f44b01b3086', 'Revenue Data & Platform Migration', 'Migration de données et systèmes Lead-to-Cash', 'Expert guidance for revenue platform transitions. Outcome: migrations that protect your data and keep revenue flowing.', 'Accompagnement expert pour les transitions de plateforme revenue. Résultat : des migrations qui protègent vos données et maintiennent le revenue en mouvement.', 4, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('9466325e-42e8-4f3c-adc8-c609d8178673', 'AI & Data Enablement', 'Enablement IA & Données', 'Integrate AI into pricing and forecasting workflows. Outcome: automation that compounds, better forecasts, faster quoting.', 'Intégrez l''IA dans vos workflows de pricing et de forecasting. Résultat : une automatisation qui se compose, de meilleurs forecasts, des devis plus rapides.', 5, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');
INSERT INTO public.advisory_services (id, title, title_fr, description, description_fr, display_order, published, created_at, updated_at) VALUES ('a82d4675-bc7c-4ca2-a160-e828d4406a56', 'GTM Engineering', 'Ingénierie GTM', 'Design scalable Go-to-Market operations. Outcome: a repeatable, measurable go-to-market motion built to scale.', 'Concevez des opérations Go-to-Market scalables. Résultat : une motion go-to-market répétable, mesurable et conçue pour passer à l''échelle.', 6, true, '2025-11-21T17:18:46.162023+00:00', '2026-06-26T09:32:44.552918+00:00');

-- portfolio_companies
INSERT INTO public.portfolio_companies (id, name, description, description_fr, logo_url, website_url, display_order, published, created_at, updated_at, role, tags, stage_year, my_role, status, project_video_url) VALUES ('b26b0265-b4e1-4188-99b0-f8fb7154aafd', 'MicePro', 'AI-powered MICE and group-sales automation for hotels and venues. From lead intake to proposal, contract, and coordination, all in one dashboard.', 'AI-powered MICE & group-sales automation for hotels and venues — from lead intake to proposal, contract, and coordination, in one dashboard.', NULL, 'https://micepro.io', 0, true, '2026-06-26T08:57:21.000707+00:00', '2026-06-26T09:06:18.387051+00:00', 'Investor', '{"Hospitality","MICE Industry","Vertical SaaS","AI Workflows"}', 'Pre-seed · 2025', 'FROM 6 acts as a hands-on operator-investor, shaping pricing and packaging, GTM strategy, and the revenue platform architecture as the team turns an internal tool into a scalable B2B SaaS.', 'Active', 'https://www.linkedin.com/posts/franckberthelot_you-can-feel-when-a-company-is-getting-sharper-ugcPost-7457337123168272384-JDCZ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAApBiaQBINHsJm7MmrCsUbyefh-ZZHX4RAo');
INSERT INTO public.portfolio_companies (id, name, description, description_fr, logo_url, website_url, display_order, published, created_at, updated_at, role, tags, stage_year, my_role, status, project_video_url) VALUES ('ec3be327-7b24-4e5e-b411-7b782aaaa267', '6WAY', 'AI-powered sports and nutrition coaching platform connecting coaches and their clients to build, track, and adjust personalized training programs.', 'AI-powered sports & nutrition coaching platform connecting coaches and their clients to build, track, and adjust personalized training programs.', NULL, 'https://6way.app', 1, true, '2026-06-26T08:57:21.000707+00:00', '2026-06-26T09:03:36.248139+00:00', 'Co-founder', '{"Vertical SaaS","AI Workflows","Health & Fitness"}', 'In build · 2026', 'FROM 6 is co-founder and operator-builder, shaping product, pricing, and GTM while building the platform toward its beta launch.', 'In build', NULL);
INSERT INTO public.portfolio_companies (id, name, description, description_fr, logo_url, website_url, display_order, published, created_at, updated_at, role, tags, stage_year, my_role, status, project_video_url) VALUES ('71cf1fde-5232-4179-b24f-596f0ce32834', 'Darix', 'Salesforce-native Lead-to-Cash agency and product suite, restoring confidence in revenue ecosystems across CPQ, billing, and integrations.', 'Salesforce-native Lead-to-Cash agency and product suite, restoring confidence in revenue ecosystems across CPQ, billing, and integrations.', NULL, 'https://darix.io', 2, true, '2026-06-26T08:57:21.000707+00:00', '2026-06-26T09:03:36.248139+00:00', 'Co-founder', '{"RevOps","Salesforce / Lead-to-Cash","AI Workflows"}', 'Co-founded · 2026', 'FROM 6 is co-founder and operating partner, leading Salesforce and revenue-platform architecture, with work underway on an in-house product suite built on top of Salesforce infrastructure.', 'Active', NULL);

-- media_opportunities
INSERT INTO public.media_opportunities (id, type, title, title_fr, description, description_fr, organization, organization_fr, date, created_at, updated_at, published) VALUES ('6c7b5efd-c197-4b4b-9517-af2374a9b8d7', 'Podcast Interview', 'Available for Podcast Interviews', 'Disponible pour des interviews podcast', 'Open to discussing Lead-to-Cash architecture, RevOps optimization, B2B SaaS scaling, and AI-powered revenue workflows.', 'Ouverts pour échanger sur l''architecture Lead-to-Cash, l''optimisation RevOps, la croissance B2B SaaS et les workflows revenue augmentés par l''IA.', '', '', '2025-11-25T13:35:55.020369+00:00', '2025-11-25T13:35:55.020369+00:00', '2026-06-26T09:32:44.552918+00:00', true);
INSERT INTO public.media_opportunities (id, type, title, title_fr, description, description_fr, organization, organization_fr, date, created_at, updated_at, published) VALUES ('f9ed9746-8819-43e9-9841-32b22bcfc2b3', 'Media Interview', 'Guest Expert Appearances', 'Interventions d''expert', 'Open for speaking engagements and expert insights on RevOps evolution, CPQ deployments, and AI transformation in revenue operations.', 'Disponibles pour des conférences et des analyses d''expert sur l''évolution du RevOps, les déploiements CPQ et la transformation IA des revenue operations.', '', '', '2025-11-25T13:35:55.020369+00:00', '2025-11-25T13:35:55.020369+00:00', '2026-06-26T09:32:44.552918+00:00', true);

-- featured_videos
INSERT INTO public.featured_videos (id, title, title_fr, youtube_url, start_seconds, display_order, published, created_at, updated_at, description, description_fr) VALUES ('79ce7118-5fde-4bcf-93a5-6b8c8c3f15c9', 'Lead-to-Cash sur Salesforce : La Masterclass de Franck Berthelot (Darix) | CRM Dojo #Part2', 'Lead-to-Cash sur Salesforce : La Masterclass de Franck Berthelot (Darix) | CRM Dojo #Part2', 'https://www.youtube.com/watch?v=SWjLUN1Vofs', 0, 0, true, '2026-04-22T14:59:31.337766+00:00', '2026-06-26T09:32:44.552918+00:00', 'A deep dive into Lead-to-Cash on Salesforce: how to architect CPQ, billing, and integrations so revenue flows cleanly from first touch to cash. Practical insight for founders and go-to-market teams on alignment, execution, and sustainable performance.', 'Un deep dive sur le Lead-to-Cash sur Salesforce : comment architecturer CPQ, facturation et intégrations pour que le revenue circule proprement du premier contact au cash. Insights pratiques pour fondateurs et équipes go-to-market sur l''alignement, l''exécution et la performance durable.');
INSERT INTO public.featured_videos (id, title, title_fr, youtube_url, start_seconds, display_order, published, created_at, updated_at, description, description_fr) VALUES ('317004f6-bf7a-4b3b-98c4-cb1d029afac6', 'De la finance à architecte #salesforce | Franck Berthelot | Darix – Podcast DOJO part.1', 'De la finance à architecte #salesforce | Franck Berthelot | Darix – Podcast DOJO part.1', 'https://www.youtube.com/watch?v=RxHz8Qx5yMY', 1740, 1, true, '2026-02-12T10:37:20.126707+00:00', '2026-06-26T09:32:44.552918+00:00', 'Franck''s path from finance to revenue architect, and his perspective on RevOps, commercial performance, and business architecture in B2B SaaS.', 'Le parcours de Franck, de la finance à architecte revenue, et sa vision du RevOps, de la performance commerciale et de l''architecture business en B2B SaaS.');
INSERT INTO public.featured_videos (id, title, title_fr, youtube_url, start_seconds, display_order, published, created_at, updated_at, description, description_fr) VALUES ('a0efa249-58a0-4cec-89ab-d3181d86283d', 'How SaaS Companies Price, Bill & Get Paid (Without the Headache)', 'How SaaS Companies Price, Bill & Get Paid (Without the Headache)', 'https://www.youtube.com/watch?v=eSlSA3eW-mY', 947, 2, true, '2026-02-12T10:37:20.126707+00:00', '2026-06-26T09:32:44.552918+00:00', 'A conversation on growth strategy, revenue operations, and the foundations of an effective B2B SaaS billing and quote-to-cash motion.', 'Une conversation sur la stratégie de croissance, les revenue operations et les fondations d''une motion billing et quote-to-cash B2B SaaS efficace.');

-- site_content
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('8b76a5be-e4e2-437b-8ff7-835023280466', 'about', 'cal_url', 'https://cal.com/from6agency/', 'https://cal.com/from6agency/', true, '2025-11-25T13:51:33.682184+00:00', '2025-11-25T14:00:55.669279+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('5e900120-b483-47f7-b08f-155b44bfbf36', 'about', 'bio', 'FROM 6 AGENCY is a strategic partner for B2B SaaS companies, from advice to investment. We combine business-architecture expertise, revenue-platform know-how, and hands-on execution to help founders and leadership teams strengthen the systems behind growth. With Salesforce and CRM & Revenue platforms at the heart of our work, we design and run Lead-to-Cash, RevOps, CPQ, billing, and AI-powered workflows that scale.', 'FROM 6 AGENCY est un partenaire stratégique pour les entreprises B2B SaaS, du conseil à l''investissement. Nous combinons expertise en architecture business, maîtrise des plateformes revenue et exécution opérationnelle pour aider les fondateurs et les équipes de direction à renforcer les systèmes qui portent la croissance. Avec Salesforce et les plateformes CRM & Revenue au cœur de notre approche, nous concevons et opérons des workflows Lead-to-Cash, RevOps, CPQ, facturation et IA scalables.', true, '2025-11-25T13:37:56.718939+00:00', '2026-06-26T10:44:55.248411+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('3fea7986-fcf3-48a7-9e81-90496c208920', 'hero', 'title', 'FROM 6 AGENCY', 'FROM 6 AGENCY', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('58588ba5-0019-4188-9a18-93806b57822f', 'hero', 'intro', 'Strategic advisory for B2B SaaS companies on revenue operations, business architecture, and AI-powered innovation.', 'Accompagnement stratégique des entreprises B2B SaaS portant sur la performance des opérations commerciales, la structuration de l’architecture métier et la valorisation de l’innovation grâce à l’intelligence artificielle', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:35:46.248255+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('da16d00f-91f9-4927-a8aa-3110f8732819', 'hero', 'subtitle', 'Advisory. Investments. Intelligence.', 'Advisory. Investissements. Expertise.', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:36:13.848533+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('92fa7d1d-fc4a-4b25-b501-408a3b55b4e8', 'investments', 'support_title', 'Active Partnership', 'Accompagnement Stratégique', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:39:44.754068+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('6f6c2825-f8f9-4077-9b93-0f2aeafbded8', 'investments', 'portfolio_title', 'Portfolio', 'Portfolio', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('341fc0ef-10aa-4228-ae51-ef5650e0e507', 'investments', 'thesis_title', 'Investment Thesis', 'Thèse d''investissement', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('456917d0-ebfd-4255-85d7-cd8277fb625c', 'investments', 'additional_support_title', 'Additional Support', 'Expertise Complémentaire', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:36:51.64318+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('06862937-1da3-4a9c-bfc1-eb8cebecfb22', 'investments', 'intro', 'Early-stage B2B SaaS investments with hands-on operational support. Focus on revenue infrastructure, RevOps tools, and AI-powered workflows.', 'Investissement en phase d’amorçage dans des startups B2B SaaS, avec accompagnement opérationnel. Focus sur l’optimisation des revenus, les outils RevOps et les workflows automatisés par l’intelligence artificielle.', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:38:05.722215+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('0ce7efee-3992-465a-b5aa-cbba7f8ab606', 'investments', 'portfolio_description', 'Portfolio companies will be featured here soon.', 'Les entreprises du portfolio seront présentées ici prochainement.', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('017fbd34-2e1d-41ea-9fc4-5fa8e881921e', 'investments', 'thesis_content', 'I invest in early-stage B2B SaaS startups building revenue infrastructure, RevOps tools, AI-powered workflows, and vertical SaaS platforms. Typical check size: €10-50K.', 'Investisseur early-stage spécialisé B2B SaaS pré-seed/seed. Focus sur l’optimisation des revenus, les outils RevOps, l’automatisation par l’IA et les SaaS verticaux. Tickets : 10-50K€.', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-27T09:17:30.405575+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('5dfadd53-658e-4acc-86b4-b2f700b25a2f', 'investments_additional', 'item2', 'Investor & customer introductions', 'Introductions investisseurs & clients', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('554e6132-7a5d-4ae1-a921-61ec378aca52', 'investments_additional', 'item3', 'Governance & board advisory', 'Gouvernance & advisory board', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('bb8b185b-e258-42e9-8a1c-427ec9a393d4', 'investments_additional', 'item4', 'Hands-on business systems architecture', 'Architecture systèmes business hands-on', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('52bedac5-5693-4534-a20e-a7046353e3bd', 'investments_additional', 'item1', 'Strategic hiring (Sales, RevOps, Product)', 'Recrutement stratégique (Sales, RevOps, Produit)', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('ff1d6523-c6eb-42df-81d7-a5cd2a9a98f7', 'investments_support', 'area3_title', 'Product Positioning & Roadmap', 'Positionnement Produit & Roadmap', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('c94e4c9e-6775-42b1-a5f3-e917476b9367', 'investments_support', 'area2_title', 'Revenue Platforms Architecture', 'Architecture Revenue', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-27T09:26:34.516459+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('3966ee93-86d2-4fc4-b36a-c1421cedb220', 'investments_support', 'area1_desc', 'Build efficient sales engines and scalable GTM motions', 'Concevoir des moteurs de croissance performants et des stratégies go-to-market scalables', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:43:58.096248+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('10714860-3b8c-4f4a-8b94-646dc9b487bb', 'investments_support', 'area2_desc', 'Design revenue infrastructure from day one', 'Poser les fondations de la croissance dès le lancement', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:45:22.258943+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('605c68df-34e2-4a27-ac21-5703c306d2b7', 'investments_support', 'area4_title', 'Revenue Operations Setup', 'Structurer les Revenue Operations', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:48:23.065441+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('d80a436c-f639-45eb-b4ba-c4e2e8858f63', 'investments_support', 'area4_desc', 'Deploy CRM foundations, Quote-to-Cash processes, finance systems and analytics', 'Déployer les fondations CRM, processus du devis à l’encaissement, finance et analytics', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:49:05.877472+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('ce1cb1a2-5059-46a7-85d4-1225b89becd0', 'investments_support', 'area1_title', 'Go-to-Market Strategy & Execution', 'Stratégie & Exécution Go-to-Market', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('2bb65f8d-d1ba-4ecd-966c-323172bc4bce', 'investments_support', 'area3_desc', 'Align product strategy with market needs', 'Aligner la stratégie produit avec les besoins du marché', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-25T13:37:56.718939+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('036a5e92-71a4-4401-a84a-80dd684b695f', 'legal', 'content', 'Website Publisher
The website www.from6agency.com is published by:
FROM 6 AGENCY
French Simplified Joint-Stock Company (SAS)
SIRET: 940 540 008 00015
Trade Register: City - PARIS
Share Capital: 1000 €
Publication Director: Franck Berthelot
Contact: www.from6agency.com
Hosting
The website is hosted by:
Hosting provider name - OVH

Intellectual Property
All website content (text, images, videos, logos) is the exclusive property of FROM 6 AGENCY unless otherwise stated. Any reproduction, distribution, or use without prior authorization is prohibited .
Liability
FROM 6 AGENCY strives to ensure the accuracy of information published on this site but cannot guarantee the absence of errors. Users acknowledge using this information at their own risk.
Cookies
This site uses cookies to improve user experience and analyze traffic. For more information, see our Privacy Policy .', 'Éditeur du site
Le site www.from6agency.com est édité par :
FROM 6 AGENCY
Société par Actions Simplifiée (SAS)
SIRET : 940 540 008 00015
RCS : Ville d’immatriculation - PARIS
Capital social : 1000 €
Directeur de la publication : Franck Berthelot
Contact : www.from6agency.com
Hébergement
Le site est hébergé par :
Nom de l’hébergeur - OVH
Propriété intellectuelle
L’ensemble du contenu du site (textes, images, vidéos, logos) est la propriété exclusive de FROM 6 AGENCY, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite .
Responsabilité
FROM 6 AGENCY s’efforce d’assurer l’exactitude des informations publiées sur ce site, mais ne peut garantir l’absence d’erreurs. L’utilisateur reconnaît utiliser ces informations sous sa propre responsabilité.
Cookies
Ce site utilise des cookies pour améliorer l’expérience utilisateur et analyser le trafic. Pour plus d’informations, consultez notre Politique de Confidentialité .', true, '2025-11-26T15:44:23.800182+00:00', '2025-11-26T15:47:56.799432+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('216f0d1d-5e42-4530-9b8c-4d492c086b0c', 'media', 'intro', 'Analysis and learnings on building high-performing, scalable companies', 'Analyses et retours d’expérience sur la construction d’entreprises performantes et scalables', true, '2025-11-25T13:37:56.718939+00:00', '2025-11-26T14:50:04.736457+00:00', NULL, NULL);
INSERT INTO public.site_content (id, section, key, content_en, content_fr, published, created_at, updated_at, image_url, image_settings) VALUES ('4330a782-b3ad-4af4-a471-ec2890f60828', 'privacy', 'content', 'Last Updated: 26/11/2025
FROM 6 AGENCY places great importance on protecting your personal data. This policy explains how we collect, use, and protect your information in compliance with GDPR .
1. Data Controller
FROM 6 AGENCY SAS
SIRET: 940 540 008 00015
2. Data Collected
We may collect the following data :
	•	Contact form: name, first name, email, company, message
	•	Newsletter: email address
	•	Analytics cookies: browsing data (Google Analytics or similar)
3. Purpose of Processing
Your data is collected to :
	•	Respond to your contact requests
	•	Send you our newsletter (with your consent)
	•	Improve our services and analyze website traffic
4. Legal Basis
The processing of your data is based on :
	•	Your consent (forms, newsletter)
	•	Performance of pre-contractual measures (quote requests)
	•	Our legitimate interest (analytics, site improvement)
5. Data Retention
	•	Contact forms: 3 years maximum
	•	Newsletter: until unsubscription
	•	Analytics cookies: 13 months maximum 
6. Data Recipients
Your data is not sold. It may be shared with:
	•	Technical service providers (hosting, emailing)
	•	Analytics tools (Google Analytics - anonymized data)
7. Your Rights
Under GDPR, you have the following rights :
	•	Right of access: obtain a copy of your data
	•	Right to rectification: correct your data
	•	Right to erasure: delete your data
	•	Right to object: oppose the processing
	•	Right to data portability: retrieve your data
	•	Right to restriction: limit processing
To exercise these rights, contact us.
You can also file a complaint with the French data protection authority (CNIL): www.cnil.fr
8. Security
We implement technical and organizational measures to protect your data against unauthorized access, loss, or disclosure .
9. Cookies
This site uses cookies. You can manage your preferences through your browser or our cookie banner.', 'Dernière mise à jour : 26/11/2025
FROM 6 AGENCY accorde une grande importance à la protection de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations conformément au RGPD .
1. Responsable du traitement
FROM 6 AGENCY SAS
SIRET : 940 540 008 00015

2. Données collectées
Nous pouvons collecter les données suivantes  :
	•	Formulaire de contact : nom, prénom, email, entreprise, message
	•	Newsletter : adresse email
	•	Cookies analytiques : données de navigation (Google Analytics ou similaire)
3. Finalités du traitement
Vos données sont collectées pour  :
	•	Répondre à vos demandes de contact
	•	Vous envoyer notre newsletter (avec votre consentement)
	•	Améliorer nos services et analyser l’audience du site
4. Base légale
Le traitement de vos données repose sur  :
	•	Votre consentement (formulaires, newsletter)
	•	L’exécution de mesures précontractuelles (demandes de devis)
	•	Notre intérêt légitime (analytics, amélioration du site)
5. Durée de conservation
	•	Formulaires de contact : 3 ans maximum
	•	Newsletter : jusqu’à désinscription
	•	Cookies analytics : 13 mois maximum 
6. Destinataires des données
Vos données ne sont pas vendues. Elles peuvent être partagées avec :
	•	Prestataires techniques (hébergement, emailing)
	•	Outils analytics (Google Analytics - données anonymisées)
7. Vos droits
Conformément au RGPD, vous disposez des droits suivants  :
	•	Droit d’accès : obtenir une copie de vos données
	•	Droit de rectification : corriger vos données
	•	Droit à l’effacement : supprimer vos données
	•	Droit d’opposition : vous opposer au traitement
	•	Droit à la portabilité : récupérer vos données
	•	Droit de limitation : limiter le traitement
Pour exercer ces droits, contactez-nous.
Vous pouvez également déposer une réclamation auprès de la CNIL : www.cnil.fr
8. Sécurité
Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation .
9. Cookies
Ce site utilise des cookies. Vous pouvez gérer vos préférences via votre navigateur ou notre bandeau cookies.', true, '2025-11-26T15:47:39.359512+00:00', '2025-11-26T15:47:39.359512+00:00', NULL, NULL);
