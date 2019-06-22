CREATE TABLE Settings(
	id INT NOT NULL IDENTITY(1,1),
	min_read_time INT NULL,
	read_every VARCHAR(128) NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(account_id)
);


