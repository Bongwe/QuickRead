package za.co.quick.read.obomvu.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "GAMESTATE")
public class GameState {
    private Long id;
    private Long account_id;
    private Date lastRead;

    public GameState() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "account_id", nullable = false)
    public Long getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Long account_id) {
        this.account_id = account_id;
    }

    @Column(name = "lastRead", nullable = true)
    public Date getLastRead() {
        return lastRead;
    }

    public void setLastRead(Date lastRead) {
        this.lastRead = lastRead;
    }

    @Override
    public String toString() {
        return "GameState{" +
                "id=" + id +
                ", account_id=" + account_id +
                ", lastRead=" + lastRead +
                '}';
    }
}
