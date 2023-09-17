package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "login_pm")
public class User {
    @Id
    @GeneratedValue
    private int id;//было long, у нас integer в бд
    @Column(name = "nickname", nullable = false)
    private String username;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "password_pm", nullable = false)
    private String password;

    public void setId (int id) {
        this.id = id;
    }

    public int getId () {
        return id;
    }

    public String getUsername () {
        return username;
    }

    public void setUsername (String username) {
        this.username = username;
    }

    public String getEmail () {
        return email;
    }

    public void setEmail (String email) {
        this.email = email;
    }

    public String getPassword () {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }
}
