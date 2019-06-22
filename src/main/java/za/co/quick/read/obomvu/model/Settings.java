package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "settings")
public class Settings {

    private Long id;
    private Long min_read_time;
    private Long account_id;
    private String read_every;

    public Settings() {
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

    @Column(name = "read_every", nullable = true)
    public String getRead_every() {
        return read_every;
    }

    public void setRead_every(String read_every) {
        this.read_every = read_every;
    }

    public Settings(Long id, Long min_read_time, Long account_id, String read_every) {
        this.id = id;
        this.min_read_time = min_read_time;
        this.account_id = account_id;
        this.read_every = read_every;
    }

    @Override
    public String toString() {
        return "Settings{" +
                "id=" + id +
                ", min_read_time=" + min_read_time +
                ", account_id=" + account_id +
                ", read_every='" + read_every + '\'' +
                '}';
    }
}
