INSERT INTO COMPANY(name) VALUES ("Viveris");


INSERT INTO users (pseudo, job, city, picture_background, nb_carshares, kilometers, experience, level, UID_company) VALUES 
("Esteban",    "Dev Full-Stack",    "Boulogne-Billancourt",    "desert"   ,549,  8754,  400, 9, 1),
("Alexandra",  "Business Analyst",  "Montpellier", "land", 93,   2750,  47, 2, 1),
("Enzo",       "Developper",         "Nice", "forest", 80,   1800,  270, 7, 1),
("Dimitri",    "IT Manager",        "Boulogne-Billancourt", "sky", 58,   1500,  4500, 29, 1),
("Solenne",    "UX Designer",       "Montpellier", "mountain" ,  43,   1240,  2800, 24, 1),
("Yann",       "RH",                "Montpellier", "mountain" ,  39,   1150,  12, 1, 1),
("Ruben",    "Dev Back",    "Paris",    "desert"   ,10,  50,  87, 4, 1);


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


INSERT INTO BADGE(name_badge, picture_badge, description, goals) VALUES
("Covoitureur", "covoitureur", "covoiturages réalisés", "5, 20, 50, 100"),
("Covoiturage consécutif", "covoitureur_consecutif", "covoiturages consécutifs réalisés", "2, 3, 5, 10"),
("Kilométrage", "kilometrage", "Parcourez des kilomètres en covoiturage", "50, 150, 500, 1000"),
("Éco-citoyen", "eco_citoyen", "Réduisez vos émissions de CO2 grâce au covoiturage", "1, 2, 3, 4"),
("Vétéran", "veteran", "Utilisez l'application de covoiturage pendant plusieurs semaines", "2, 4, 12, 24"),
("Annonceur", "annonceur", "Postez des annonces de covoiturage", "3, 10, 20, 50"),
("Partenaire", "partenaire", "Partagez un covoiturage avec plusieurs passagers différents","2, 3, 5, 10"),
("Challenge", "challenge", "Réussir des challenges", "2, 3, 5, 10" );

INSERT INTO OWNEDBADGE(UID_badge, UID_user, level) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 3),
(6, 3, 2);


                        
                        
                        
                        
                        
                        
                        
                          
                            
                             
                             
                            
                            
                            
                            