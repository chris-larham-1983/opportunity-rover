CREATE DATABASE pernstack;

CREATE TABLE Wishlist(
    wishlist_id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_name VARCHAR(30) NOT NULL REFERENCES Customers(username) ON DELETE CASCADE,
    created_or_modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- add a 'user' field to 'todo' table:
ALTER TABLE todo
ADD user_name VARCHAR(255);

-- add a 'created_or_modified' field to 'todo' table:
ALTER TABLE todo
ADD created_or_modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- update the various todos with a new user and date of creation/modification:
UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=20;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=4;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=6;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=8;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=9;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=7;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=10;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=28;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=11;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=12;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=13;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=16;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=17;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=18;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=19;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=30;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=22;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=24;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=25;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=26;

UPDATE todo
SET user_name='saint john the divine', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=23;

UPDATE todo
SET user_name='Chris Larham', created_or_modified=(SELECT CURRENT_TIMESTAMP)
WHERE todo_id=21;

-- set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- insert fake users
INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

--create the Products table
CREATE TABLE Products(
    id bigserial PRIMARY KEY,
    item_name varchar(50) NOT NULL,
    item_description text NOT NULL,
    image_url varchar(100) UNIQUE NOT NULL,
    price integer NOT NULL
);

-- insert dummy data into Products
INSERT INTO Products(item_name, item_description, image_url, price)
VALUES('Opportunity Rover: 2008-04-03 (Sol 1490)', 'Photo taken by the Opportunity Rover''s Navigation Camera on 2008-04-03 (expedition sol 1490)', 'https//mars.nasa.gov/mer/gallery/all/1/n/1490/1N260454912EFF8976P1947L0M1-BR.JPG', 1000),
	  ('Opportunity Rover: 2004-02-04 (Sol 10)', 'Photo taken by the Opportunity Rover''s Front Hazard Avoidance Camera on 2004-02-04 (expedition sol 10)', 'https://mars.nasa.gov/mer/gallery/all/1/f/010/1F129070908EDN0224P1101L0M1-BR.JPG', 800),
      ('Opportunity Rover: 2004-01-26 (Sol 1)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2004-01-26 (expedition sol 1)', 'https://mars.nasa.gov/mer/gallery/all/1/p/001/1P128287426EFF0000P2303L2M1-BR.JPG', 600),
      ('Opportunity Rover: 2004-01-26 (Sol 1)', 'Photo taken by the Opportunity Rover''s Navigation Camera on 2004-01-26 (expedition sol 1)', 'https://mars.nasa.gov/mer/gallery/all/1/n/001/1N128285132EDN0000P1500R0M1-BR.JPG', 700),
      ('Opportunity Rover: 2004-01-26 (Sol 1)', 'Photo taken by the Opportunity Rover''s Rear Hazard Avoidance Camera on 2004-01-26 (expedition sol 1)', 'https://mars.nasa.gov/mer/gallery/all/1/r/001/1R128285184EDN0000P1002L0M1-BR.JPG', 900);

-- CREATE Customers table
CREATE TABLE Customers(
    id bigserial PRIMARY KEY,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    username varchar(30) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(320) NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4(),
    is_administrator boolean DEFAULT false
);

-- CREATE Addresses table
CREATE TABLE Addresses(
    id bigserial PRIMARY KEY,
    street_number VARCHAR(30) NOT NULL,
    street_name varchar(50) NOT NULL,
    town varchar(100) NOT NULL,
    county VARCHAR(60) NOT NULL,
    country VARCHAR(60) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    customer_id bigint REFERENCES Customers(id) NOT NULL ON DELETE CASCADE
);

-- Create Cart table
CREATE TABLE Cart(
    product_id bigint REFERENCES Products(id) NOT NULL ON DELETE CASCADE,
    customer_id bigint REFERENCES Customers(id) NOT NULL ON DELETE CASCADE,
    product_name varchar(50) NOT NULL,
    product_description text NOT NULL,
    product_image_url varchar(100) NOT NULL,
    product_price integer NOT NULL,
    product_quantity integer NOT NULL,
    cumulative_product_price integer NOT NULL,
    cart_total integer
);

-- Create Orders table
CREATE TABLE Orders(
    id bigserial PRIMARY KEY,
    customer_id bigint REFERENCES Customers(id) NOT NULL ON DELETE CASCADE,
    date_of_purchase timestamp NOT NULL,
    cart json[] NOT NULL
);
 --ALTER TABLE Orders DROP CONSTRAINT orders_customer_id_fkey, ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY(customer_id) REFERENCES Customers(id) ON DELETE CASCADE
 --CREATE SEQUENCE wishlist_id_seq MINVALUE 38; ALTER TABLE wishlist ALTER wishlist_id SET DEFAULT nextval('wishlist_id_seq'); ALTER SEQUENCE wishlist_id_seq OWNED BY wishlist.wishlist_id;
 -- SELECT last_value FROM sequence_name;