begin;

-- French versions missing on the Projects page, French wording fixes, and 6WAY out of beta (11/11/2026).
-- Adds three nullable columns; nothing existing is renamed or dropped.
alter table public.portfolio_companies add column if not exists stage_year_fr text, add column if not exists my_role_fr text, add column if not exists tags_fr text[];

update public.portfolio_companies set stage_year_fr = 'Création · 2026', my_role_fr = 'FROM 6 est cofondateur et associé opérationnel : il pilote l''architecture Salesforce et celle des plateformes de revenus, avec une suite de produits maison en cours de développement sur l''infrastructure Salesforce.', tags_fr = array['RevOps', 'Salesforce / Lead-to-Cash', 'Workflows IA'] where name = 'Darix';
update public.portfolio_companies set stage_year_fr = 'Pré-seed · 2025', my_role_fr = 'FROM 6 intervient comme investisseur impliqué dans l''opérationnel : prix et offres, stratégie go-to-market et architecture de la plateforme de revenus, pendant que l''équipe transforme un outil interne en SaaS B2B capable de passer à l''échelle.', tags_fr = array['Hôtellerie', 'Secteur MICE', 'SaaS vertical', 'Workflows IA'] where name = 'MicePro';
update public.portfolio_companies set stage_year_fr = 'Lancement · 2026', my_role_fr = 'FROM 6 est cofondateur et construit le produit : fonctionnalités, application des coachs, prix et mise sur le marché, avec Sonho Agency.', tags_fr = array['Santé et fitness', 'Coach IA', 'Application mobile'] where name = '6WAY';

update public.site_content set content_fr = replace(content_fr, 'la société par laquelle j''opère et j''investis', 'la société avec laquelle j''entreprends et j''investis') where content_fr like '%la société par laquelle j''opère et j''investis%';
update public.site_content set content_fr = replace(content_fr, 'construire les systèmes derrière le revenu', 'construire les systèmes derrière les revenus') where content_fr like '%construire les systèmes derrière le revenu%';
update public.media_opportunities set title_fr = replace(title_fr, 'Disponible pour des interviews podcast', 'Disponible pour des interviews en podcast') where title_fr like '%Disponible pour des interviews podcast%';
update public.media_opportunities set description_fr = replace(description_fr, 'les workflows de revenus augmentés par l''IA', 'les processus de revenus augmentés par l''IA') where description_fr like '%les workflows de revenus augmentés par l''IA%';
update public.featured_videos set description_fr = replace(description_fr, 'de l''architecture business en B2B SaaS', 'de l''architecture d''entreprise dans le SaaS B2B') where description_fr like '%de l''architecture business en B2B SaaS%';
update public.featured_videos set description_fr = replace(description_fr, 'd''une démarche de facturation et de quote-to-cash B2B SaaS efficace', 'd''une démarche efficace de facturation et de quote-to-cash pour le SaaS B2B') where description_fr like '%d''une démarche de facturation et de quote-to-cash B2B SaaS efficace%';

-- 6WAY is no longer in beta (Franck, 11/11/2026).
update public.portfolio_companies set stage_year = 'Launched · 2026' where name = '6WAY' and stage_year = 'Beta · 2026';
update public.portfolio_companies set description = replace(description, ' Live on the web, iPhone beta open on request.', '') where description like '% Live on the web, iPhone beta open on request.%';
update public.portfolio_companies set description_fr = replace(description_fr, ' En ligne sur le web, bêta iPhone ouverte sur demande.', '') where description_fr like '% En ligne sur le web, bêta iPhone ouverte sur demande.%';
update public.portfolio_companies set my_role = replace(my_role, ' The app is live on the web and in beta on iPhone via TestFlight.', '') where my_role like '% The app is live on the web and in beta on iPhone via TestFlight.%';
update public.site_content set content_en = replace(content_en, '6WAY, in beta since 2026, is a training and nutrition app with an AI coach, live on the web and on iPhone by request.', '6WAY, launched in 2026, is a training and nutrition app with an AI coach.') where content_en like '%6WAY, in beta since 2026, is a training and nutrition app with an AI coach, live on the web and on iPhone by request.%';
update public.site_content set content_fr = replace(content_fr, '6WAY, en bêta depuis 2026, est une app d''entraînement et de nutrition avec un coach IA, en ligne sur le web et sur iPhone sur demande.', '6WAY, lancée en 2026, est une app d''entraînement et de nutrition avec un coach IA.') where content_fr like '%6WAY, en bêta depuis 2026, est une app d''entraînement et de nutrition avec un coach IA, en ligne sur le web et sur iPhone sur demande.%';

commit;
