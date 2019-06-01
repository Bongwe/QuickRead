package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "BOOKSECTION")
public class BookSection {

    private Long id;
    private Long opponent_id;
    private Long book_id;
    private String status;
    private String content;

    public BookSection() {
    }

    public BookSection(Long id, Long opponent_id, Long book_id, String status, String content) {
        this.id = id;
        this.opponent_id = opponent_id;
        this.book_id = book_id;
        this.status = status;
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

    @Column(name = "opponent_id", nullable = true)
    public Long getOpponent_id() {
        return opponent_id;
    }

    public void setOpponent_id(Long opponent_id) {
        this.opponent_id = opponent_id;
    }

    @Column(name = "book_id", nullable = true)
    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

    @Column(name = "status", nullable = true)
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(name = "content", nullable = true)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "BookSection{" +
                "id=" + id +
                ", opponent_id=" + opponent_id +
                ", book_id=" + book_id +
                ", status='" + status + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
