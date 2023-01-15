-- CREATE Customers table
CREATE TABLE Customers(
    id bigserial PRIMARY KEY,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    username varchar(30) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(320) UNIQUE NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4(),
    is_administrator boolean DEFAULT false
);

-- CREATE Addresses table
CREATE TABLE Addresses(
    id bigserial PRIMARY KEY,
    street_number varchar(30) NOT NULL,
    street_name varchar(50) NOT NULL,
    town varchar(100) NOT NULL,
    county varchar(60) NOT NULL,
    country varchar(60) NOT NULL,
    postcode varchar(10) NOT NULL,
    customer_id bigint NOT NULL REFERENCES Customers(id) ON DELETE CASCADE
);

-- CREATE Wishlist table
CREATE TABLE Wishlist(
    wishlist_id bigserial PRIMARY KEY,
    description varchar(255) NOT NULL,
    user_name varchar(30) NOT NULL REFERENCES Customers(username) ON DELETE CASCADE,
    created_or_modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

--CREATE Products table
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
      ('Opportunity Rover: 2004-01-26 (Sol 1)', 'Photo taken by the Opportunity Rover''s Rear Hazard Avoidance Camera on 2004-01-26 (expedition sol 1)', 'https://mars.nasa.gov/mer/gallery/all/1/r/001/1R128285184EDN0000P1002L0M1-BR.JPG', 900),
      ('Opportunity Rover: 2009-11-10 (Sol 2060)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2009-11-10 (expedition sol 2060)', 'http://mars.nasa.gov/mer/gallery/all/1/p/2060/1P311056692EFFA9PDP2448L7M1-BR.JPG', 999),
      ('Opportunity Rover: 2012-09-14 (Sol 3071)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2012-09-14 (expedition sol 3071)', 'http://mars.nasa.gov/mer/gallery/all/1/n/3071/1N400818123EFFBW00P1978L0M1-BR.JPG', 899),
      ('Opportunity Rover: 2015-10-19 (Sol 4171)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2015-10-19 (expedition sol 4171)', 'http://mars.nasa.gov/mer/gallery/all/1/p/4171/1P498467649EFFCONGP2363L2M1-BR.JPG', 1099),
      ('Opportunity Rover: 2018-04-27 (Sol 5067)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2018-04-27 (expedition sol 5067)', 'https://mars.nasa.gov/mer/gallery/all/1/p/5067/1P578008813EFFD2CWP2365L2M1-BR.JPG', 1299),
      ('Opportunity Rover: 2005-07-06 (Sol 514)', 'Photo taken by the Opportunity Rover''s Panoramic Camera on 2005-07-06 (expedition sol 514)', 'https://mars.nasa.gov/mer/gallery/all/1/p/514/1P173813405EFF55XKP2763R7M1-BR.JPG', 1299);

-- Create Cart table
CREATE TABLE Cart(
    product_id bigint NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    customer_id bigint NOT NULL REFERENCES Customers(id) ON DELETE CASCADE,
    product_name varchar(50) NOT NULL,
    product_description text NOT NULL,
    product_image_url varchar(100) NOT NULL,
    product_price integer NOT NULL,
    product_quantity integer NOT NULL,
    cumulative_product_price integer NOT NULL,
    cart_total integer,
    added_to_cart timestamp NOT NULL
);

-- Create Orders table
CREATE TABLE Orders(
    id bigserial PRIMARY KEY,
    customer_id bigint NOT NULL REFERENCES Customers(id) ON DELETE CASCADE,
    date_of_purchase timestamp NOT NULL,
    cart json[] NOT NULL
);