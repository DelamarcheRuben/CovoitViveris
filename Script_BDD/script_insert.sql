-- Insertion des compagnies
INSERT INTO COMPANY (name) VALUES ('Viveris');

-- Insertion des adresses
INSERT INTO ADDRESS (city, department, postcode, road, house_number, latitude, longitude)
VALUES
    ('Paris', 'Paris', 75001, 'Rue de Rivoli', 1, 48.8566, 2.3522),
    ('Paris', 'Paris', 75004, 'Place de la Bastille', 4, 48.853, 2.3692),
    ('Paris', 'Paris', 75006, 'Boulevard Saint-Germain', 60, 48.8538, 2.3388),
    ('Paris', 'Paris', 75007, 'Rue de Grenelle', 70, 48.8565, 2.3201),
    ('Paris', 'Paris', 75008, 'Avenue des Champs-Élysées', 100, 48.8696, 2.3079),
    ('Paris', 'Paris', 75014, 'Avenue du Maine', 140, 48.8319, 2.3231),
    ('Paris', 'Paris', 75016, 'Rue de la Pompe', 160, 48.8626, 2.2819),
    ('Paris', 'Paris', 75018, 'Rue Marcadet', 180, 48.8922, 2.3444),
    ('Boulogne-Billancourt', 'Hauts-de-Seine', 92100, 'Rue du Point du Jour', 10, 48.8352, 2.2413),
    ('Neuilly-sur-Seine', 'Hauts-de-Seine', 92200, 'Avenue Charles de Gaulle', 22, 48.8848, 2.2684),
    ('Versailles', 'Yvelines', 78000, 'Avenue de Paris', 5, 48.8046, 2.1203),
    ('Saint-Denis', 'Seine-Saint-Denis', 93200, 'Rue Gabriel Péri', 11, 48.9362, 2.3574),
    ('Montreuil', 'Seine-Saint-Denis', 93100, 'Rue de Paris', 56, 48.8638, 2.4484),
    ('Créteil', 'Val-de-Marne', 94000, 'Avenue du Général de Gaulle', 1, 48.7795, 2.4557),
    ('Nanterre', 'Hauts-de-Seine', 92000, 'Rue Maurice Thorez', 7, 48.892, 2.2069);

-- Insertion des utilisateurs (en référençant l'adresse et la compagnie)
INSERT INTO USERS (pseudo, password, last_name, first_name, email, job, address, picture_background, car_type, fuel_consumption, level, experience, bonus_loyalty, kilometers, nb_carshares, CO_2_economy, UID_company) VALUES
('Esteban', '', 'Doe', 'Esteban', 'esteban@neraudau.fr', 'Dev Full-Stack', 1, 'desert', 'Sedan', 5.5, 9, 50, 10, 8754, 549, 1.2, 1),
('Alexandra', '', 'Smith', 'Alexandra', 'alexandra@example.com', 'Business Analyst', 2, 'land', 'Compact', 6.2, 2, 12, 5, 2750, 93, 0.9, 1),
('JulieMartin', '', 'Martin', 'Julie', 'julie.martin@viveris.fr', 'Data Scientist', 5, 'mountain', 'Electric', 0.0, 4, 25, 5, 1620, 30, 0.8, 1),
('LucasDurand', '', 'Durand', 'Lucas', 'lucas.durand@viveris.fr', 'Système d\'Information', 4, 'forest', 'Diesel', 6.5, 3, 15, 3, 980, 15, 0.5, 1),
('EmiliePetit', '', 'Petit', 'Emilie', 'emilie.petit@viveris.fr', 'Ingénieur logiciel', 3, 'mountain', 'Hybride', 4.2, 5, 40, 7, 2500, 45, 1.1, 1),
('RaphaelLefevre', '', 'Lefevre', 'Raphael', 'raphael.lefevre@viveris.fr', 'Architecte réseau', 2, 'forest', 'Essence', 7.5, 6, 60, 9, 3200, 60, 1.4, 1),
('SophieBertrand', '', 'Bertrand', 'Sophie', 'sophie.bertrand@viveris.fr', 'Chef de projet IT', 1, 'desert', 'GPL', 5.8, 7, 75, 10, 4100, 75, 1.7, 1);

-- Insertion des carshares (en référençant les adresses et les utilisateurs)
INSERT INTO CARSHARE (max_passenger, is_full, schedule, start_place, end_place, distance, bonus_pollution, comeback, UID_driver) VALUES
(3, FALSE, '2024-03-05 8:30:00', 1, 2, 12.5, 0.5, FALSE, 1),
(2, FALSE, '2024-03-07 9:00:00', 3, 4, 8.0, 0.3, TRUE, 2),
(4, FALSE, '2024-03-08 10:30:00', 5, 6, 15.2, 0.7, FALSE, 3),
(2, FALSE, '2024-03-10 14:00:00', 7, 8, 9.8, 0.4, TRUE, 4),
(3, FALSE, '2024-03-12 16:45:00', 9, 10, 11.3, 0.6, FALSE, 5),
(4, FALSE, '2024-03-15 7:30:00', 11, 12, 18.6, 0.8, TRUE, 6),
(2, FALSE, '2024-03-18 13:20:00', 13, 14, 7.5, 0.3, FALSE, 7),
(3, FALSE, '2024-03-21 11:00:00', 1, 5, 21.1, 0.9, TRUE, 1),
(2, FALSE, '2024-03-24 18:00:00', 2, 9, 25.7, 1.1, FALSE, 2),
(4, FALSE, '2024-03-28 8:15:00', 3, 7, 14.3, 0.6, TRUE, 3);

-- Insertion des passagers
INSERT INTO PASSENGER (UID_carshare, UID_passenger, schedule, start_place) VALUES
(1, 2, '2024-03-05 8:30:00', 1),
(2, 1, '2024-03-07 9:00:00', 3);

-- Insertion des challenges
INSERT INTO CHALLENGE (name, description, goal, bonus_exp, expired_date) VALUES
('Mangeur de kilomètres', '34km en covoiturage en 1 mois', 34, 300, '2024-03-24'),
('Collègue parfait', '5 personnes différentes en 1 mois', 5, 150, '2024-04-01');

-- Insertion des ligues
INSERT INTO LEAGUE (start_date, end_date) VALUES ('2024-03-01', '2024-06-01');
-- Insertion des participations aux ligues et aux challenges
-- Assurez-vous d'avoir les bons UID_challenge et UID_league avant d'insérer ces données


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
(1, 1, 0),
(2, 1, 1),
(3, 1, 2),
(4, 1, 3),
(5, 1, 0),
(6, 1, 0),
(7, 1, 0),
(8, 1, 0),
(1, 2, 0),
(2, 2, 1),
(3, 2, 0),
(4, 2, 1),
(5, 2, 0),
(6, 2, 1),
(7, 2, 0),
(8, 2, 1),
(1, 3, 0),
(2, 3, 1),
(3, 3, 2),
(4, 3, 3),
(5, 3, 0),
(6, 3, 0),
(7, 3, 0),
(8, 3, 0),
(1, 4, 1),
(2, 4, 1),
(3, 4, 1),
(4, 4, 1),
(5, 4, 1),
(6, 4, 1),
(7, 4, 1),
(8, 4, 1),
(1, 5, 1),
(2, 5, 1),
(3, 5, 1),
(4, 5, 1),
(5, 5, 1),
(6, 5, 1),
(7, 5, 1),
(8, 5, 1),
(1, 6, 1),
(2, 6, 2),
(3, 6, 3),
(4, 6, 4),
(5, 6, 1),
(6, 6, 2),
(7, 6, 3),
(8, 6, 4),
(1, 7, 2),
(2, 7, 2),
(3, 7, 2),
(4, 7, 2),
(5, 7, 2),
(6, 7, 2),
(7, 7, 2),
(8, 7, 2);



INSERT INTO FRIEND(user1, user2) VALUES
(1, 2),
(1, 3),
(1, 4),
(2, 5);