CREATE TABLE OPPONENT(
	id INT NOT NULL IDENTITY(1,1),
	health INT NULL,
	name  VARCHAR(128) NULL,
	avatar VARCHAR(128) NULL,
	power VARCHAR(128) NULL,
	PRIMARY KEY(id)
);

drop table OPPONENT;

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Evil Igor','evil-igor.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Greedy Reaper','greedy-reaper.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Green Ghost','green-ghost.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Pumped Pumpkin','pumped-pumpkin.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Venomous Vampire','venomous-vampire.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Witty Witch','witty-witch.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Wooden Wolf','wooden-wolf.png');

INSERT INTO OPPONENT (health, name, avatar)
VALUES (100,'Zulu Zombie','zulu-zombie.png');

select * from OPPONENT;
