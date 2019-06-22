package za.co.quick.read.obomvu.model;

import javax.persistence.*;

@Entity
@Table(name = "opponent")
public class Opponent {
    private Long id;
    private Long health;
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

    @Override
    public String toString() {
        return "Opponent{" +
                "id=" + id +
                ", health=" + health +
                ", name='" + name + '\'' +
                ", avatar='" + avatar + '\'' +
                ", power='" + power + '\'' +
                '}';
    }
}
