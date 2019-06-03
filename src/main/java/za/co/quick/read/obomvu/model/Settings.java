package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "SETTINGS")
public class Settings {

    private Long id;
    private Long min_read_time;
    private Long account_id;

    public Settings() {
    }

    public Settings(Long id, Long min_read_time, Long account_id) {
        this.id = id;
        this.min_read_time = min_read_time;
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

    @Column(name = "min_read_time", nullable = true)
    public Long getMin_read_time() {
        return min_read_time;
    }

    public void setMin_read_time(Long min_read_time) {
        this.min_read_time = min_read_time;
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
        return "Settings{" +
                "id=" + id +
                ", min_read_time=" + min_read_time +
                ", account_id=" + account_id +
                '}';
    }
}
