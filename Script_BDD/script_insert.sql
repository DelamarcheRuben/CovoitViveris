INSERT INTO COMPANY(name)
VALUES
    ("Viveris");

-- Utilisateurs de Viveris
INSERT INTO users (
    pseudo, job, city, picture_background,
    nb_carshares, kilometers, experience,
    level, UID_company
)
VALUES
    (
        "Esteban", "Dev Full-Stack", "Boulogne-Billancourt",
        "desert", 549, 8754, 50, 9, 1
    ),
    (
        "Alexandra", "Business Analyst",
        "Montpellier", "land", 93, 2750, 12,
        2, 1
    ),
    (
        "Enzo", "Developper", "Nice", "forest",
        80, 1800, 23, 7, 1
    ),
    (
        "Dimitri", "IT Manager", "Boulogne-Billancourt",
        "sky", 58, 1500, 351, 29, 1
    ),
    (
        "Solenne", "UX Designer", "Montpellier",
        "mountain", 43, 1240, 200, 24, 1
    ),
    (
        "Yann", "RH", "Montpellier", "mountain",
        39, 1150, 0, 1, 1
    ),
    (
        "Ruben", "Dev Back", "Paris", "desert",
        10, 50, 17, 4, 1
    ),
    (
        "Nathan", "Intern", "Lyon", "lake",
        5, 200, 5, 1, 1
    ),
    (
        "Léa", "Project Manager", "Toulouse", "city",
        25, 3400, 75, 13, 1
    ),
    (
        "Thomas", "Marketing", "Marseille", "ocean",
        30, 5000, 90, 15, 1
    ),
    (
        "Clara", "Customer Support", "Rennes", "mountain",
        15, 2500, 60, 10, 1
    ),
    (
        "Paul", "DevOps Engineer", "Strasbourg", "city",
        42, 7000, 120, 20, 1
    ),
    (
        "Marie", "UI Designer", "Lille", "sky",
        20, 3000, 80, 14, 1
    ),
    (
        "Antoine", "Data Analyst", "Nantes", "forest",
        35, 6000, 100, 18, 1
    ),
    (
        "Sophie", "HR", "Grenoble", "mountain",
        28, 4500, 85, 16, 1
    ),
    (
        "Julien", "DevOps Engineer", "Bordeaux", "city",
        37, 6500, 110, 19, 1
    ),
    (
        "Charlotte", "Marketing", "Nice", "ocean",
        27, 4000, 70, 12, 1
    ),
    (
        "Lucas", "Business Intelligence", "Toulon", "beach",
        18, 2700, 65, 11, 1
    ),
    (
        "Camille", "Product Manager", "Aix-en-Provence", "mountain",
        22, 3600, 78, 14, 1
    ),
    (
        "Nicolas", "DevOps Engineer", "Cannes", "city",
        33, 5500, 95, 17, 1
    );

-- Partages de voiture de Viveris
INSERT INTO carshare(
    max_passenger, schedule, start_place,
    end_place, UID_driver
)
VALUES
    (
        3, "2024-03-05 8:30:00", "3 rue Émile Zola, 94200",
        "36 Rue de Bellevue 92100", 1
    ),
    (
        3, "2024-03-06 9:00:00", "3 rue Émile Zola, 94200",
        "36 Rue de Bellevue 92100", 1
    ),
    (
        1, "2024-03-12 8:20:00", "80 rue de Balzac, 75110",
        "36 Rue de Bellevue 92100", 2
    ),
    (
        4, "2024-03-05 12:00:00", "15 bis avenue Laplace, 94110",
        "36 Rue de Bellevue 92100", 3
    ),
    (
        3, "2024-03-06 9:00:00", "3 rue Émile Zola, 94200",
        "36 Rue de Bellevue 92100", 4
    ),
    (
        1, "2024-03-07 10:00:00", "18 avenue Foch, 75008",
        "36 Rue de Bellevue 92100", 5
    ),
    (
        2, "2024-03-08 11:00:00", "22 rue de la Paix, 75002",
        "36 Rue de Bellevue 92100", 6
    ),
    (
        3, "2024-03-09 12:00:00", "27 avenue des Champs-Élysées, 75008",
        "36 Rue de Bellevue 92100", 7
    ),
    (
        2, "2024-03-10 13:00:00", "15 rue de Rivoli, 75001",
        "36 Rue de Bellevue 92100", 1
    ),
    (
        1, "2024-03-11 14:00:00", "13 rue du Faubourg-Saint-Honoré, 75008",
        "36 Rue de Bellevue 92100", 2
    );

-- Défis de Viveris
INSERT INTO CHALLENGE(
    name, description, goal, bonus_exp,
    expired_date
)
VALUES
    (
        "Mangeur de kilomètres", "34km en covoiturage en 1 mois",
        34, 300, "2024-03-24"
    ),
    (
        "Collègue parfait", "5 personnes différentes en 1 mois",
        5, 150, "2024-04-01"
    );

-- Ligue de Viveris
INSERT INTO LEAGUE(start_date, end_date)
VALUES
    ("2024-03-01", "2024-06-01");

-- Participation à la ligue de Viveris
INSERT INTO PLAY(UID_league, UID_user, experience)
VALUES
    (1, 1, 100),
    (1, 2, 200),
    (1, 3, 300),
    (1, 4, 400),
    (1, 5, 500),
    (1, 6, 600),
    (1, 7, 700),
    (1, 8, 800),
    (1, 9, 900),
    (1, 10, 1000),
    (1, 11, 1100),
    (1, 12, 1200),
    (1, 13, 1300),
    (1, 14, 1400),
    (1, 15, 1500),
    (1, 16, 1600),
    (1, 17, 1700),
    (1, 18, 1800),
    (1, 19, 1900),
    (1, 20, 2000);

-- Participation aux défis de Viveris
INSERT INTO PARTICIPATE(
    UID_challenge, UID_user, progression
)
VALUES
    (1, 2, 16.6),
    (1, 5, 5.4),
    (2, 4, 2);
