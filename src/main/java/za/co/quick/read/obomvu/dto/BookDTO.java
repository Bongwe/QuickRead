package za.co.quick.read.obomvu.dto;

public class BookDTO {
    private Long id;
    private Long complete_percent;
    private Long  book_section_id;
    private Long player_id;
    private String title;
    private String author;
    private String synopses;
    private String shortSynopses;
    private String content;

    public BookDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getComplete_percent() {
        return complete_percent;
    }

    public void setComplete_percent(Long complete_percent) {
        this.complete_percent = complete_percent;
    }

    public Long getBook_section_id() {
        return book_section_id;
    }

    public void setBook_section_id(Long book_section_id) {
        this.book_section_id = book_section_id;
    }

    public Long getPlayer_id() {
        return player_id;
    }

    public void setPlayer_id(Long player_id) {
        this.player_id = player_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSynopses() {
        return synopses;
    }

    public void setSynopses(String synopses) {
        this.synopses = synopses;
    }

    public String getShortSynopses() {
        return shortSynopses;
    }

    public void setShortSynopses(String shortSynopses) {
        this.shortSynopses = shortSynopses;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "BookDTO{" +
                "id=" + id +
                ", complete_percent=" + complete_percent +
                ", book_section_id=" + book_section_id +
                ", player_id=" + player_id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", synopses='" + synopses + '\'' +
                ", shortSynopses='" + shortSynopses + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
