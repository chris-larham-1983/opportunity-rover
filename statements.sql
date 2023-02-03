-- THIS FILE CAN BE IGNORED; IT IS NOT NEEDED FOR THE PROJECT TO WORK *
-- IVE ONLY KEPT IT IN THE PROJECT FOR FUTURE REFERENCE, AS IT HAS SOME ||
--    USEFUL SQL STATEMENTS IN IT! *

CREATE DATABASE pernstack;

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


--ALTER TABLE Orders DROP CONSTRAINT orders_customer_id_fkey, ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY(customer_id) REFERENCES Customers(id) ON DELETE CASCADE
--CREATE SEQUENCE wishlist_id_seq MINVALUE 38; ALTER TABLE wishlist ALTER wishlist_id SET DEFAULT nextval('wishlist_id_seq'); ALTER SEQUENCE wishlist_id_seq OWNED BY wishlist.wishlist_id;
-- SELECT last_value FROM sequence_name;

-- Delete all records relating to sol 58 after table insertion was interrupted; create a new sequence for id to follow, based on last id
-- DELETE FROM Photos WHERE sol = 58; CREATE SEQUENCE updated_photos_id_seq MINVALUE 8455; ALTER TABLE Photos ALTER id SET DEFAULT nextval('updated_photos_id_seq'); ALTER SEQUENCE updated_photos_id_seq OWNED BY photos.id;