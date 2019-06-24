package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "selected_opponent")
public class SelectedOpponent {
    private Long id;
    private Long book_id;
    private Long health;
    private Long account_id;
    private String name;
    private String avatar;
    private String power;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "book_id", nullable = false)
    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

    @Column(name = "health", nullable = true)
    public Long getHealth() {
        return health;
    }

    public void setHealth(Long health) {
        this.health = health;
    }

    @Column(name = "name", nullable = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "avatar", nullable = true)
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    @Column(name = "power", nullable = true)
    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
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
        return "SelectedOpponent{" +
                "id=" + id +
                ", book_id=" + book_id +
                ", health=" + health +
                ", account_id=" + account_id +
                ", name='" + name + '\'' +
                ", avatar='" + avatar + '\'' +
                ", power='" + power + '\'' +
                '}';
    }
}
