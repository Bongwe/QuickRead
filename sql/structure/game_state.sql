CREATE TABLE game_state(
	id INT NOT NULL IDENTITY(1,1),
	account_id INT NOT NULL,
	day INT NULL,
	month INT NULL,
	year INT NULL,
	hour INT NULL,
	minute INT NULL,
	second INT NULL,
	PRIMARY KEY(id)
);