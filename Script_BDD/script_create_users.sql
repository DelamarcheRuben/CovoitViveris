CREATE TABLE USERS (
  PRIMARY KEY (UID),
  UID           INT NOT NULL AUTO_INCREMENT,
  pseudo        VARCHAR(42),
  password      VARCHAR(42),
  last_name     VARCHAR(42),
  first_name    VARCHAR(42),
  email         VARCHAR(42),
  company_ID    VARCHAR(42),
  job           VARCHAR(42),
  car_type      VARCHAR(42),
  fuel          VARCHAR(42),
  city          VARCHAR(42),
  bonus_loyalty VARCHAR(42),
  picture_background VARCHAR(42),
  nb_carshares VARCHAR(42),
  kilometers   VARCHAR(42),
  CO_2_economy VARCHAR(42),
  level         INT,
  experience    VARCHAR(42)
);

CREATE TABLE CARSHARE (
  PRIMARY KEY (UID),
  UID             VARCHAR(42) NOT NULL AUTO_INCREMENT,
  max_passenger   VARCHAR(42),
  is_Full         BOOLEAN,
  schedule        VARCHAR(42),
  start_place     VARCHAR(42),
  end_place       VARCHAR(42),
  distance        VARCHAR(42),
  bonus_pollution VARCHAR(42),
  UID_driver      VARCHAR(42) NOT NULL
);

CREATE TABLE ISPASSENGER (
  PRIMARY KEY (UID, UID_passenger),
  UID           VARCHAR(42) NOT NULL,
  UID_passenger VARCHAR(42) NOT NULL,
  schedule      VARCHAR(42),
  start_place   VARCHAR(42),
  with_Comeback VARCHAR(42)
);

ALTER TABLE CARSHARE ADD FOREIGN KEY (UID_driver) REFERENCES USER (UID);

ALTER TABLE ISPASSENGER ADD FOREIGN KEY (UID_passenger) REFERENCES USER (UID);
ALTER TABLE ISPASSENGER ADD FOREIGN KEY (UID) REFERENCES CARSHARE (UID);