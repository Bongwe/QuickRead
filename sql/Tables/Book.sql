BEGIN TRAN

CREATE TABLE Book(
	id INT NOT NULL IDENTITY(1,1),
	title VARCHAR(128) NOT NULL,
	author VARCHAR(128) NOT NULL,
	synopses VARCHAR(128) NOT NULL,
	content VARCHAR(128) NOT NULL,
	complete_percent INT NOT NULL,
	book_section_id INT NOT NULL,
	player_id INT NOT NULL,
	PRIMARY KEY(id)
);

select * from book;

ALTER TABLE Book ALTER COLUMN complete_percent INT NULL;

ALTER TABLE Book ALTER COLUMN synopses text NULL;

id INT NOT NULL IDENTITY(1,1),
	title VARCHAR(128) NOT NULL,
	author VARCHAR(128) NOT NULL,
	synopses VARCHAR(128) NOT NULL,
	content VARCHAR(128) NOT NULL,
	complete_percent INT NOT NULL,
	book_section_id INT NOT NULL,
	player_id INT NOT NULL,

INSERT INTO Book (title, author)
VALUES ('Kai Lung�s Golden Hours', 'Ernest Bramah');

--ROLLBACK
--COMMIT