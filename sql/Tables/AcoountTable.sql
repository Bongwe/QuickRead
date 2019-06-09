BEGIN TRAN

CREATE TABLE Account(
	id INT NOT NULL IDENTITY(1,1),
	health INT NULL,
	name VARCHAR(128) NOT NULL,
	username VARCHAR(128) NOT NULL,
	email VARCHAR(128) NOT NULL,
	password VARCHAR(128) NOT NULL,
	interests VARCHAR(500) NULL,
	profile_picture VARCHAR(500) NULL,
	PRIMARY KEY(email)
);

drop table Account;
ALTER TABLE Account
ALTER COLUMN interests VARCHAR(500);

select * from Account;

select * from Book;

--ROLLBACK
--COMMIT