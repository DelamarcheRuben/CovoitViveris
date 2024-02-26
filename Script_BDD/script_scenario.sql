DROP TABLE PLAY;
DROP TABLE PASSENGER;
DROP TABLE PARTICIPATE;
DROP TABLE CHALLENGE;
DROP TABLE LEAGUE;
DROP TABLE CARSHARE;
DROP TABLE OWNEDBADGE;
DROP TABLE BADGE;
DROP TABLE FRIEND;
DROP TABLE USERS;
DROP TABLE COMPANY;
DROP TABLE ADDRESS;

CREATE TABLE ADDRESS (
    UID INT NOT NULL AUTO_INCREMENT,
    city VARCHAR(30),
    department VARCHAR(30),
    postcode INT,
    road VARCHAR(100),
    house_number INT,
    latitude DOUBLE,
    longitude DOUBLE,
    PRIMARY KEY (UID)
);

CREATE TABLE CARSHARE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    max_passenger INT,
    is_full BOOLEAN,
    schedule DATETIME,
    start_place INT,
    end_place INT,
    distance FLOAT,
    bonus_pollution FLOAT,
    comeback BOOLEAN,
    experience INT,
    has_validated BOOLEAN,
    co2_economy FLOAT,
    finished BOOLEAN,
    UID_driver INT NOT NULL
);

CREATE TABLE CHALLENGE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(42),
    description VARCHAR(200),
    goal FLOAT,
    bonus_exp FLOAT,
    deadline INT
);
CREATE TABLE COMPANY (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(42)
);
CREATE TABLE PASSENGER (
    PRIMARY KEY (UID_carshare, UID_passenger),
    UID_carshare INT NOT NULL,
    UID_passenger INT NOT NULL,
    experience INT,
    has_validated BOOLEAN
    -- schedule DATETIME,
    -- start_place INT
);
CREATE TABLE LEAGUE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE PARTICIPATE (
    PRIMARY KEY (UID_user, UID_challenge),
    UID_user INT NOT NULL,
    UID_challenge INT NOT NULL,
    co2_economy FLOAT,
    kilometers FLOAT,
    completed_rides INT,
    different_passengers INT,
    progress FLOAT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    has_completed BOOLEAN DEFAULT FALSE,
    time_over BOOLEAN DEFAULT FALSE
);

CREATE TABLE PLAY (
    PRIMARY KEY (UID_league, UID_user),
    UID_league INT NOT NULL,
    UID_user INT NOT NULL,
    experience INT
);
CREATE TABLE BADGE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    name_badge VARCHAR(42),
    description VARCHAR(150),
    picture_badge VARCHAR(42),
    goals VARCHAR(42)
);
CREATE TABLE OWNEDBADGE (
    PRIMARY KEY (UID_badge, UID_user),
    UID_badge INT NOT NULL,
    UID_user INT NOT NULL,
    level INT NOT NULL
);
CREATE TABLE USERS (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(42),
    password VARCHAR(42),
    last_name VARCHAR(42),
    first_name VARCHAR(42),
    email VARCHAR(42),
    job VARCHAR(42),
    address INT,
    picture_background VARCHAR(42),
    picture_profile VARCHAR(42),
    car_type INT,
    fuel_consumption FLOAT,
    level INT,
    experience INT,
    bonus_loyalty FLOAT,
    kilometers FLOAT,
    nb_carshares INT,
    co2_economy FLOAT,
    UID_company INT,
    UID_sponsor INT
);

CREATE TABLE FRIEND(
    PRIMARY KEY (user1, user2),
    user1 INT NOT NULL,
    user2 INT NOT NULL
);

ALTER TABLE
    CARSHARE
    ADD
        FOREIGN KEY (UID_driver) REFERENCES USERS (UID);
ALTER TABLE
    PASSENGER
    ADD
        FOREIGN KEY (UID_passenger) REFERENCES USERS (UID);
ALTER TABLE
    PASSENGER
    ADD
        FOREIGN KEY (UID_carshare) REFERENCES CARSHARE (UID);
ALTER TABLE
    PARTICIPATE
    ADD
        FOREIGN KEY (UID_challenge) REFERENCES CHALLENGE (UID);
ALTER TABLE
    PARTICIPATE
    ADD
        FOREIGN KEY (UID_user) REFERENCES USERS (UID);
ALTER TABLE
    PLAY
    ADD
        FOREIGN KEY (UID_league) REFERENCES LEAGUE (UID);
ALTER TABLE
    PLAY
    ADD
        FOREIGN KEY (UID_user) REFERENCES USERS (UID);
ALTER TABLE
    OWNEDBADGE
    ADD
        FOREIGN KEY (UID_badge) REFERENCES BADGE (UID);
ALTER TABLE
    OWNEDBADGE
    ADD
        FOREIGN KEY (UID_user) REFERENCES USERS (UID);
ALTER TABLE
    USERS
    ADD
        FOREIGN KEY (UID_company) REFERENCES COMPANY (UID);
ALTER TABLE
    USERS
    ADD
        FOREIGN KEY (UID_sponsor) REFERENCES USERS (UID);

ALTER TABLE
    CARSHARE
    ADD
        FOREIGN KEY (start_place) REFERENCES ADDRESS (UID);

ALTER TABLE
    CARSHARE
    ADD
        FOREIGN KEY (end_place) REFERENCES ADDRESS (UID);
        
ALTER TABLE
    USERS
    ADD
        FOREIGN KEY (address) REFERENCES ADDRESS (UID);

ALTER TABLE
    FRIEND
    ADD
        FOREIGN KEY (user1) REFERENCES USERS (UID);

ALTER TABLE
    FRIEND
    ADD
        FOREIGN KEY (user2) REFERENCES USERS (UID);

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
INSERT INTO USERS (pseudo, password, last_name, first_name, email, job, address, picture_background, picture_profile, car_type, level, experience, bonus_loyalty, kilometers, nb_carshares, co2_economy, UID_company) VALUES
('Esteban', '', 'Doe', 'Esteban', 'esteban@neraudau.fr', 'Dev Full-Stack', 1, 'desert', "2", 0, 5, 2, 1, 30, 3, 15.7, 1),
('Alexandra', '', 'Smith', 'Alexandra', 'gifhugues@gmail.com', 'Business Analyst', 2, 'land', "1", 1, 4, 10, 1, 11, 4, 6.3, 1),
('Francis', '', 'Martin', 'Francis', 'francis.martin@viveris.fr', 'Data Scientist', 5, 'mountain', "4", 6, 5, 4, 1, 7, 2, 14.1, 1);
-- ('Alice', '', 'Wonderland', 'Alice', 'alice.mail@email.fr', 'RH', 8, 'mountain', "5", 2, 1, 0, 0, 7, 0, 0, 1);

-- Insertion des carshares (en référençant les adresses et les utilisateurs)
INSERT INTO CARSHARE (max_passenger, is_full, schedule, start_place, end_place, distance, bonus_pollution, comeback, has_validated, finished, co2_economy, experience, UID_driver) VALUES
(3, FALSE, '2024-03-05 8:30:00', 1, 2, 12.5, 1, FALSE, TRUE, TRUE, 8, 16, 1),
(2, FALSE, '2024-03-07 9:00:00', 3, 4, 8.0, 1, TRUE, TRUE, TRUE, 5.79, 16, 1),
(4, FALSE, '2024-03-08 10:30:00', 5, 6, 15.2, 1, FALSE, TRUE, TRUE, 15, 18, 3),
(2, FALSE, '2024-03-10 14:00:00', 7, 8, 9.8, 1, TRUE, FALSE, FALSE, 6.3, NULL, 2);


-- Insertion des passagers
INSERT INTO PASSENGER (UID_carshare, UID_passenger, has_validated, experience) VALUES
(1, 2, TRUE, 11),
(2, 2, TRUE, 12),
(3, 1, TRUE, 13),
(4, 3, TRUE, 13);

-- Insertion des challenges
INSERT INTO CHALLENGE (name, description, goal, bonus_exp, deadline) VALUES
('Mangeur de kilomètres', 'Parcourir 100km en covoiturage', 90, 300, 30),
('Collègue parfait', '5 personnes différentes en 1 mois', 5, 500, 30),
('L\'Efficace', 'Compléter 3 covoiturages', 20, 100, 7),
('Main verte', 'Économiser 150kg de CO2', 150, 600, 30),
('Le régulier', '12 covoiturages en 1 mois', 12, 800, 30);


-- Insertion des ligues
INSERT INTO LEAGUE (start_date, end_date) VALUES ('2024-03-01', '2024-06-01');
-- Insertion des participations aux ligues et aux challenges
-- Assurez-vous d'avoir les bons UID_challenge et UID_league avant d'insérer ces données


INSERT INTO BADGE(name_badge, picture_badge, description, goals) VALUES
("Covoitureur", "covoitureur", "covoiturages réalisés", "5, 20, 50, 100"),
("Covoiturage consécutif", "covoitureur_consecutif", "covoiturages consécutifs réalisés", "2, 3, 5, 10"),
("Kilométrage", "kilometrage", "Parcourez des kilomètres en covoiturage", "50, 150, 500, 1000"),
("Éco-citoyen", "eco_citoyen", "Réduisez vos émissions de CO2 grâce au covoiturage", "50, 200, 500, 1000"),
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
(8, 3, 0);



INSERT INTO FRIEND(user1, user2) VALUES
(1, 2);