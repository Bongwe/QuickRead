CREATE TABLE BOOKSHELF(
	id INT NOT NULL IDENTITY(1,1),
	book_id INT NOT NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(id)
);

select * from BOOKSHELF;

select * from book;

delete from BOOKSHELF;

drop table book_shelf;