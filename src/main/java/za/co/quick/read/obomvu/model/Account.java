package za.co.quick.read.obomvu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Account")
public class Account {

	private long id;
	private long health;
	private String name;
	private String username;
	private String email;
	private String password;
	private String interests;
	private String profile_picture;

	public Account() {
		
	}

	public Account(long id, long health, String name, String username, String email, String password, String interests, String profile_picture) {
		this.id = id;
		this.health = health;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.interests = interests;
		this.profile_picture = profile_picture;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "username", nullable = false)
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "email", nullable = false)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "password", nullable = false)
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "interests", nullable = false)
	public String getInterests() {
		return interests;
	}
	public void setInterests(String interests) {
		this.interests = interests;
	}

	@Column(name = "profile_picture", nullable = false)
	public String getProfile_picture() {
		return profile_picture;
	}

	public void setProfile_picture(String profile_picture) {
		this.profile_picture = profile_picture;
	}

	@Column(name = "health", nullable = false)
	public long getHealth() {
		return health;
	}

	public void setHealth(long health) {
		this.health = health;
	}

	@Override
	public String toString() {
		return "Account{" +
				"id=" + id +
				", name='" + name + '\'' +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				", interests='" + interests + '\'' +
				", profile_picture='" + profile_picture + '\'' +
				'}';
	}
}
