-- 6WAY : l'app est construite et en ligne (site 6way.app, web app app.6way.app,
-- bêta iPhone ouverte sur demande via TestFlight). La fiche portfolio passe de
-- « In build » à « Active » et la description décrit le produit réel : VOLT,
-- carnet de séances, programmes de course, nutrition, stats, espace coach.
--
-- À appliquer sur le projet from6agency (ref qaxeszpfjpjzxlxhwmaq) depuis le
-- SQL Editor du dashboard Supabase, ou via `supabase db push` une fois le CLI
-- connecté au compte franck.berthelot@from6agency.com (le CLI de ce Mac est
-- connecté à l'org « 6way », qui ne voit pas ce projet). Le même contenu est
-- aussi dans src/lib/fallback-data.json (instantané de secours).
-- Après application : redéployer le site, le contenu est lu au build.

update public.portfolio_companies
set
  description = 'One app for strength training, running, nutrition and stats, with VOLT, an AI coach that logs workouts, meals and sleep from a sentence and writes dated race programs. Coaches follow their athletes from a dedicated dashboard. Live on the web, iPhone beta open on request.',
  description_fr = 'Une seule app pour la musculation, le running, la nutrition et les statistiques, avec VOLT, un coach IA qui note séances, repas et sommeil à partir d''une phrase et écrit des programmes de course datés. Les coachs suivent leurs athlètes depuis un tableau de bord dédié. En ligne sur le web, bêta iPhone ouverte sur demande.',
  tags = '{"Health & Fitness","AI Coach","Mobile App"}',
  stage_year = 'Beta · 2026',
  my_role = 'FROM 6 is co-founder and operator-builder: product and features, the coach app, pricing and go-to-market, built with Sonho Agency. The app is live on the web and in beta on iPhone via TestFlight.',
  status = 'Active',
  updated_at = now()
where id = 'ec3be327-7b24-4e5e-b411-7b782aaaa267';
