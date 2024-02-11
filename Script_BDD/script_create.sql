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
    UID_driver INT NOT NULL
);

CREATE TABLE CHALLENGE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(42),
    description VARCHAR(200),
    goal FLOAT,
    bonus_exp FLOAT,
    expired_date DATE
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
    schedule DATETIME,
    start_place INT
);
CREATE TABLE LEAGUE (
    PRIMARY KEY (UID),
    UID INT NOT NULL AUTO_INCREMENT,
    start_date DATE,
    end_date DATE
);
CREATE TABLE PARTICIPATE (
    PRIMARY KEY (UID_challenge, UID_user),
    UID_challenge INT NOT NULL,
    UID_user INT NOT NULL,
    progression FLOAT
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
    car_type VARCHAR(42),
    fuel_consumption FLOAT,
    level INT,
    experience INT,
    bonus_loyalty FLOAT,
    kilometers FLOAT,
    nb_carshares INT,
    CO_2_economy FLOAT,
    UID_company INT,
    UID_sponsor INT
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
    PASSENGER
    ADD
        FOREIGN KEY (start_place) REFERENCES ADDRESS (UID);

ALTER TABLE
    USERS
    ADD
        FOREIGN KEY (address) REFERENCES ADDRESS (UID);