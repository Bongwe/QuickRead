CREATE TABLE book(
	id INT NOT NULL IDENTITY(1,1),
	title VARCHAR(128) NULL,
	author VARCHAR(128) NULL,
	synopses text NULL,
	content text NULL,
	complete_percent INT NULL,
	book_section_id INT NULL,
	player_id INT NULL,
	PRIMARY KEY(id)
);
