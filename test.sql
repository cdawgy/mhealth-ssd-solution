CREATE DATABASE IF NOT EXISTS MHEALTH;

USE MHEALTH;

CREATE TABLE accounts(
    id int NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    account_type VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE therapists(
    id int NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE children(
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    points int NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE parents(
    id int NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    child_id int REFERENCES children(id),
    therapist_id int REFERENCES therapists(id),
    PRIMARY KEY(id)
);

CREATE TABLE awards(
    id int NOT NULL AUTO_INCREMENT,
    parent_id int REFERENCES parents(id),
    title VARCHAR (255) NOT NULL,
    cost int NOT NULL,
    PRIMARY KEY(id)
);

-- Need to revisit this for storage of content, 255 is too small
-- Think I will break each topic into its own block to store?
CREATE TABLE resources(
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR (255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE sounds(
    id int NOT NULL AUTO_INCREMENT,
    child_id int REFERENCES children(child_id),
    sound VARCHAR (255) NOT NULL,
    word VARCHAR (255) NOT NULL,
    location_url VARCHAR (255) NOT NULL,
    date_created datetime default NOW(),
    PRIMARY KEY(id)
);


-- conorloughran99 account
INSERT INTO accounts(google_id, account_type) VALUES ("117961479542614585037", "parent");
-- mhealth account
INSERT INTO accounts(google_id, account_type) VALUES ("109020841686505071523", "therapist");

-- Data for therapist account
INSERT INTO therapists(google_id, first_name, surname) VALUES ("109020841686505071523", "Dylan", "McDonnell");

-- Child account for above parent
INSERT INTO children(first_name, points) VALUES ("Sam", 2);

-- Parent account
INSERT INTO parents(google_id, first_name, surname, child_id, therapist_id) VALUES ("109020841686505071523", "Conor", "Loughran", 1, 1);

-- Resources
INSERT INTO resources(title, content) VALUES ("Some Resource 1", "This is the content of the resource");
INSERT INTO resources(title, content) VALUES ("Some Resource 2", "This is the content of the resource");

-- Sound Clips
INSERT INTO sounds(child_id, sound, word, location_url) VALUES (1, "ee", "Tea", "https://mhealthstorageaccount.blob.core.windows.net/sound-store/d720ca41-d80c-4afa-8414-5a46ec234590");
INSERT INTO sounds(child_id, sound, word, location_url) VALUES (1, "ee", "Pea", "https://mhealthstorageaccount.blob.core.windows.net/sound-store/d720ca41-d80c-4afa-8414-5a46ec234590");
INSERT INTO sounds(child_id, sound, word, location_url) VALUES (1, "ø", "Soap", "https://mhealthstorageaccount.blob.core.windows.net/sound-store/d720ca41-d80c-4afa-8414-5a46ec234590");
INSERT INTO sounds(child_id, sound, word, location_url) VALUES (1, "ø", "Pope", "https://mhealthstorageaccount.blob.core.windows.net/sound-store/d720ca41-d80c-4afa-8414-5a46ec234590");

-- Awards
INSERT INTO awards(parent_id, title, cost) VALUES (1, "Go to cinema", 7);
INSERT INTO awards(parent_id, title, cost) VALUES (1, "Go to toy store", 7);
INSERT INTO awards(parent_id, title, cost) VALUES (1, "Go to park", 5);
INSERT INTO awards(parent_id, title, cost) VALUES (1, "1 hour on games", 3);
INSERT INTO awards(parent_id, title, cost) VALUES (1, "coca cola & chocolate", 3);