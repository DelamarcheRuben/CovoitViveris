INSERT INTO COMPANY(name) VALUES ("Viveris");


INSERT INTO users (pseudo, job, city, picture_background, nb_carshares, kilometers, experience, UID_company) VALUES 
("Esteban",    "Dev Full-Stack",    "Boulogne-Billancourt",    "desert"   ,549,  8754,  109, 1),
("Alexandra",  "Business Analyst",  "Montpellier", "land", 93,   2750,  47, 1),
("Enzo",       "Developper",         "Nice", "forest", 80,   1800,  35, 1),
("Dimitri",    "IT Manager",        "Boulogne-Billancourt", "sky", 58,   1500,  33, 1),
("Solenne",    "UX Designer",       "Montpellier", "mountain" ,  43,   1240,  28, 1),
("Yann",       "RH",                "Montpellier", "mountain" ,  39,   1150,  6, 1),
("Ruben",    "Dev Back",    "Paris",    "desert"   ,10,  50,  8, 1);


INSERT INTO carshare(max_passenger, schedule, start_place, end_place, UID_driver) VALUES
(3, "2024-03-05 8:30:00", "3 rue Émile Zola, 94200", "36 Rue de Bellevue 92100", 1),
(3, "2024-03-06 9:00:00", "3 rue Émile Zola, 94200", "36 Rue de Bellevue 92100", 1),
(1, "2024-03-12 8:20:00", "80 rue de Balzac, 75110", "36 Rue de Bellevue 92100", 2),
(4, "2024-03-05 12:00:00", "15 bis avenue Laplace, 94110", "36 Rue de Bellevue 92100", 3);

INSERT INTO PASSENGER(UID_carshare, UID_passenger, schedule, start_place) VALUES
(1, 6, "2024-03-05 8:05:00", "45 rue Émile Zola, 94200"),
(3, 7, "2024-03-05 7:50:00", "33 rue Lamber Wilson, 91400");

INSERT INTO CHALLENGE(name, description, goal, bonus_exp, expired_date) VALUES
("Mangeur de kilomètres", "34km en covoiturage en 1 mois", 34, 300, "2024-03-24"),
("Collègue parfait", "5 personnes différentes en 1 mois", 5, 150, "2024-04-01");

INSERT INTO LEAGUE(start_date, end_date) VALUES
("2024-03-01", "2024-06-01");

INSERT INTO PLAY(UID_league, UID_user, experience) VALUES
(1, 1, 100),
(1, 2, 200),
(1, 3, 300),
(1, 4, 400),
(1, 5, 500),
(1, 6, 600),
(1, 7, 700);

INSERT INTO PARTICIPATE(UID_challenge, UID_user, progression) VALUES
(1, 2, 16.6),
(1, 5, 5.4),
(2, 4, 2);


INSERT INTO BADGE(name_badge, picture_badge) VALUES
("Covoitureur", "covoitureur.png"),
("Covoiturage consécutif", "covoit_consecutif.png"),
("Kilométrage", "kilometrage.png"),
("Éco-citoyen", "eco_citoyen.png"),
("Vétéran", "veteran.png"),
("Annonceur", "annonceur.png"),
("Partenaire", "partenaire.png"),
("Challenge", "challenge.png");

INSERT INTO OWNEDBADGE(UID_badge, UID_user, level) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 3, 2);
