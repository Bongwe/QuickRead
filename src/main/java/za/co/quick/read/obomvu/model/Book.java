package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "Book")
public class Book {

	private Long id;
	private Long complete_percent;
	private Long  book_section_id;
	private Long player_id;
	private String title;
	private String author;
	private String synopses;
	private String content;

	public Book() {

	}

	public Book(Long id, Long complete_percent, Long book_section_id, Long player_id, String title, String author, String synopses, String content) {
		this.id = id;
		this.complete_percent = complete_percent;
		this.book_section_id = book_section_id;
		this.player_id = player_id;
		this.title = title;
		this.author = author;
		this.synopses = synopses;
		this.content = content;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "complete_percent", nullable = true)
	public Long getComplete_percent() {
		return complete_percent;
	}

	public void setComplete_percent(Long complete_percent) {
		this.complete_percent = complete_percent;
	}

	@Column(name = "book_section_id", nullable = true)
	public Long getBook_section_id() {
		return book_section_id;
	}

	public void setBook_section_id(Long book_section_id) {
		this.book_section_id = book_section_id;
	}

	@Column(name = "player_id", nullable = true)
	public Long getPlayer_id() {
		return player_id;
	}

	public void setPlayer_id(Long player_id) {
		this.player_id = player_id;
	}

	@Column(name = "title", nullable = false)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "author", nullable = false)
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	@Column(name = "synopses", nullable = false)
	public String getSynopses() {
		return synopses;
	}

	public void setSynopses(String synopses) {
		this.synopses = synopses;
	}

	public String getContent() {
		return content;
	}

	@Column(name = "content", nullable = false)
	public void setContent(String content) {
		this.content = content;
	}
}
