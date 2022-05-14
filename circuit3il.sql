DROP DATABASE IF EXISTS circuit3il;
CREATE DATABASE circuit3il;

USE circuit3il;

CREATE TABLE TEST_MUSCLES(
    nom VARCHAR(50) NOT NULL,
    PRIMARY KEY(nom)
);

CREATE TABLE circuit (
  id int(11) NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE user (
  id int(11) NOT NULL,
  nom varchar(255) NOT NULL,
  prenom varchar(255) NOT NULL,
  mdp varchar(255) NOT NULL,
  mail varchar(255) NOT NULL,
  PRIMARY KEY(id)
);

ALTER TABLE circuit
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE user
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
