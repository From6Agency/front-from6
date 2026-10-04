-- Revue de contenu du 04/10/2026 : chapeau Fondateurs sans montant ni B2B,
-- bio reécrite à la première personne, fiche Darix, corrections FR des vidéos
-- et médias, dépublication des lignes mortes de l'ancien site.

update public.site_content set
  content_en = 'I invest at pre-seed and seed and stay involved after the investment: advisory, hands-on work on revenue systems, sometimes co-founding. Technology and AI are my field of expertise, but I do not limit myself to one sector.',
  content_fr = 'J''investis en pré-seed et en seed et je reste impliqué après l''investissement : conseil, travail concret sur les systèmes de revenus, parfois cofondation. La technologie et l''IA sont mon domaine d''expertise, mais je ne me limite pas à un seul secteur.',
  updated_at = now()
where section = 'investments' and key = 'thesis_content';

update public.site_content set
  content_en = 'From 6 is the company through which I operate and invest. Darix, co-founded in 2026, is the Salesforce team that executes revenue-system projects: Lead-to-Cash, CPQ, Revenue Cloud, billing, integrations. 6WAY, in beta since 2026, is a training and nutrition app with an AI coach, live on the web and on iPhone by request. MicePro, where I invest, automates group sales for hotels and venues. The role is the same each time: build the systems behind the revenue, not only advise on them.',
  content_fr = 'From 6 est la société par laquelle j''opère et j''investis. Darix, cofondée en 2026, est l''équipe Salesforce qui exécute les projets de systèmes de revenus : Lead-to-Cash, CPQ, Revenue Cloud, facturation, intégrations. 6WAY, en bêta depuis 2026, est une app d''entraînement et de nutrition avec un coach IA, en ligne sur le web et sur iPhone sur demande. MicePro, où j''investis, automatise les ventes groupes des hôtels et lieux d''événements. Le rôle est le même à chaque fois : construire les systèmes derrière le revenu, pas seulement conseiller.',
  updated_at = now()
where section = 'about' and key = 'bio';

update public.portfolio_companies set
  description = 'Salesforce-native Lead-to-Cash agency: CPQ, Revenue Cloud, billing and integrations delivered by architects, with an in-house product suite in progress.',
  description_fr = 'Agence Lead-to-Cash native Salesforce : CPQ, Revenue Cloud, facturation et intégrations livrés par des architectes, avec une suite de produits maison en cours.',
  stage_year = 'Founded · 2026',
  updated_at = now()
where name = 'Darix';

update public.featured_videos set description_fr = 'Un approfondissement du Lead-to-Cash sur Salesforce : comment architecturer CPQ, facturation et intégrations pour que les revenus circulent proprement du premier contact à l''encaissement. Conseils pratiques pour fondateurs et équipes go-to-market sur l''alignement, l''exécution et la performance durable.' where title like 'Lead-to-Cash sur Salesforce%';
update public.featured_videos set description_fr = 'Le parcours de Franck, de la finance à architecte des systèmes de revenus, et sa vision du RevOps, de la performance commerciale et de l''architecture business en B2B SaaS.' where title like 'De la finance à architecte%';
update public.featured_videos set description_fr = 'Une conversation sur la stratégie de croissance, les opérations de revenus et les fondations d''une démarche de facturation et de quote-to-cash B2B SaaS efficace.' where title like 'How SaaS Companies Price%';
update public.media_opportunities set description_fr = 'Disponible pour échanger sur l''architecture Lead-to-Cash, l''optimisation RevOps, la croissance des SaaS B2B et les workflows de revenus augmentés par l''IA.' where type = 'Podcast Interview';
update public.media_opportunities set description_fr = 'Disponible pour des conférences et des analyses d''expert sur l''évolution du RevOps, les déploiements CPQ et la transformation IA des opérations de revenus.' where type = 'Media Interview';

-- Lignes mortes de l'ancien site (plus lues par aucune page) : dépubliées.
update public.advisory_services set published = false;
update public.site_content set published = false
where section in ('hero', 'investments_additional', 'investments_support', 'media')
   or (section = 'investments' and key <> 'thesis_content');
