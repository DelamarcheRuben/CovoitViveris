CREATE TABLE USERS (
  PRIMARY KEY (UID),
  UID           INT NOT NULL AUTO_INCREMENT,
  pseudo        VARCHAR(42),
  password      VARCHAR(42),
  last_name     VARCHAR(42),
  first_name    VARCHAR(42),
  email         VARCHAR(42),
  company_ID    VARCHAR(42),
  car_type      VARCHAR(42),
  fuel          VARCHAR(42),
  level         INT,
  experience    VARCHAR(42),
  bonus_loyalty VARCHAR(42)
);