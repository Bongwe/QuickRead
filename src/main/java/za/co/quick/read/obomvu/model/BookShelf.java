package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "book_shelf")
public class BookShelf {

    private Long id;
    private Long book_id;
    private Long account_id;

    public BookShelf() {

    }

    public BookShelf(Long id, Long book_id, Long account_id) {
        this.id = id;
        this.book_id = book_id;
        this.account_id = account_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "book_id", nullable = true)
    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

    @Column(name = "account_id", nullable = true)
    public Long getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Long account_id) {
        this.account_id = account_id;
    }

    @Override
    public String toString() {
        return "BookShelf{" +
                "id=" + id +
                ", book_id=" + book_id +
                ", account_id=" + account_id +
                '}';
    }
}
