package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "game_state")
public class GameState {
    private Long id;
    private Long account_id;
    private Long day; // day of the week
    private Long hour;
    private Long minute;
    private Long second;

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

    @Column(name = "day", nullable = false)
    public Long getDay() {
        return day;
    }

    public void setDay(Long day) {
        this.day = day;
    }

    @Column(name = "hour", nullable = false)
    public Long getHour() {
        return hour;
    }

    public void setHour(Long hour) {
        this.hour = hour;
    }

    @Column(name = "minute", nullable = false)
    public Long getMinute() {
        return minute;
    }

    public void setMinute(Long minute) {
        this.minute = minute;
    }

    @Column(name = "second", nullable = false)
    public Long getSecond() {
        return second;
    }

    public void setSecond(Long second) {
        this.second = second;
    }

    @Override
    public String toString() {
        return "GameState{" +
                "id=" + id +
                ", account_id=" + account_id +
                ", day=" + day +
                ", hour=" + hour +
                ", minute=" + minute +
                ", second=" + second +
                '}';
    }
}
