CREATE TABLE selected_opponent(
	id INT NOT NULL IDENTITY(1,1),
	book_id INT NOT NULL,
	account_id INT NOT NULL,
	health INT NULL,
	name  VARCHAR(128) NULL,
	avatar VARCHAR(128) NULL,
	power VARCHAR(128) NULL,
	PRIMARY KEY(id)
);