CREATE TABLE player (
	id INT NOT NULL IDENTITY(1,1),
	account_id  INT NULL,
	health INT NULL,
	name  VARCHAR(128) NULL,
	avatar VARCHAR(128) NULL,
	power VARCHAR(128) NULL,
	PRIMARY KEY(id),
);
