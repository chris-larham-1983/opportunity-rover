-- CREATE Opportunity database
CREATE DATABASE OPPORTUNITY;

-- CREATE Manifest table
CREATE TABLE manifest(
    id bigserial PRIMARY KEY,
    sol integer UNIQUE NOT NULL,
    earth_date varchar(20) UNIQUE NOT NULL,
    total_photos integer NOT NULL,
    cameras varchar(100) NOT NULL,
    first_photo_url varchar(255) UNIQUE NOT NULL,
    first_photo_alt text UNIQUE NOT NULL
);

-- CREATE Photos table
CREATE TABLE photos (
    id serial PRIMARY KEY,
    sol integer NOT NULL,
    earth_date varchar(20) NOT NULL,
    camera varchar(100) NOT NULL,
    url varchar(255) UNIQUE NOT NULL,
    alt text NOT NULL,
    figcaption text NOT NULL
);