CREATE TABLE `user` ( 
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	lastname varchar(100),
	surname varchar(100),
	name varchar(100),
	username varchar(100),
	password varchar(255),
    type int default 0
 );

 CREATE TABLE place (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255)
 );

 CREATE TABLE category (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255)
 );

 CREATE TABLE content (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    category_id INT NOT NULL,
    views INT DEFAULT 0,
    title varchar(255),
    description TEXT,
	created_at DATE,
	updated_at DATE,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (place_id) REFERENCES place(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
 );
 
 CREATE TABLE image (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255),
    content_id INT NOT NULL,
    FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
 );
 
 CREATE TABLE video (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255),
    content_id INT NOT NULL,
    FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
 );
