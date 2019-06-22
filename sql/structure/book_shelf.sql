CREATE TABLE book_shelf(
	id INT NOT NULL IDENTITY(1,1),
	book_id INT NOT NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(id)
);