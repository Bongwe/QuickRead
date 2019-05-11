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
	private String name;
	private int age;

	public Account() {
		
	}
	
	public Account(String name, int age) {
		this.name = name;
		this.age = age;
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

	@Column(name = "age", nullable = false)
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "Account{" +
				"id=" + id +
				", name='" + name + '\'' +
				", age=" + age +
				'}';
	}
}
