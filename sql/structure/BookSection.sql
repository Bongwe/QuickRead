CREATE TABLE BookSection
	id INT NOT NULL IDENTITY(1,1),
	opponent_id INT NULL,
	book_id INT NULL,
	section_index INT NULL,
	status VARCHAR(128) NOT NULL,
	content text NULL,
	status_picture text NULL,
	PRIMARY KEY(id)
);
