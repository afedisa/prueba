
-- create club table
CREATE TABLE IF NOT EXISTS `clubs` (
    id INT PRIMARY KEY,
    name VARCHAR(10),
    budget INT DEFAULT 0
);

-- create players table
CREATE TABLE IF NOT EXISTS `players` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    salary INT DEFAULT 0,
    club_id INT,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- create trainers table
CREATE TABLE IF NOT EXISTS `trainers` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    salary INT DEFAULT 0,
    club_id INT,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- insert initial default values
INSERT INTO clubs (id,name, budget) VALUES (0,'CLUB1', 1000),(1,'CLUB2', 2000);
INSERT INTO players (name,email,salary,club_id) VALUES ('player1','test@test.com',2000,0),('player2','test2@test.com',0,NULL);
INSERT INTO trainers (name,email,salary,club_id) VALUES ('trainer1','test3@test.com',0,NULL),('trainer2','test4@test.com',1000,1);