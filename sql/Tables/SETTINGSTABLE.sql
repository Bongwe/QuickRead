CREATE TABLE SETTINGS(
	id INT NOT NULL IDENTITY(1,1),
	min_read_time INT NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(account_id)
);