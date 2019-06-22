package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "book_section")
public class BookSection {

    private Long id;
    private Long opponent_id;
    private Long book_id;
    private Long section_index;
    private String status;
    private String content;
    private String status_picture;

    public BookSection() {
    }

    public BookSection(Long id, Long opponent_id, Long book_id, Long section_index, String status, String content, String status_picture) {
        this.id = id;
        this.opponent_id = opponent_id;
        this.book_id = book_id;
        this.section_index = section_index;
        this.status = status;
        this.content = content;
        this.status_picture = status_picture;
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

    @Column(name = "section_index", nullable = true)
    public Long getSection_index() {
        return section_index;
    }

    public void setSection_index(Long section_index) {
        this.section_index = section_index;
    }

    @Column(name = "status_picture", nullable = true)
    public String getStatus_picture() {
        return status_picture;
    }

    public void setStatus_picture(String status_picture) {
        this.status_picture = status_picture;
    }

    @Override
    public String toString() {
        return "BookSection{" +
                "id=" + id +
                ", opponent_id=" + opponent_id +
                ", book_id=" + book_id +
                ", section_index=" + section_index +
                ", status='" + status + '\'' +
                ", content='" + content + '\'' +
                ", status_picture='" + status_picture + '\'' +
                '}';
    }
}
