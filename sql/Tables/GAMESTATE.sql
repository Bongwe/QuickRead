CREATE TABLE GAMESTATE(
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

drop table GAMESTATE;

delete from GAMESTATE;

select * from GAMESTATE;