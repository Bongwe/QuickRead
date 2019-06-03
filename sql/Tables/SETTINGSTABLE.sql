CREATE TABLE SETTINGS(
	id INT NOT NULL IDENTITY(1,1),
	min_read_time INT NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(account_id)
);

drop table SETTINGS;

select * from SETTINGS;

select * from Account;

select * from Account where name = 'zzz';

delete from Account where id = 2045;
delete from Settings where account_id = 2045;