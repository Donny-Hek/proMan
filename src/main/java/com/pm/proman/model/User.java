package com.pm.proman.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "login_pm")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//был long, у нас integer в бд
    @Column(name = "nickname", nullable = false)
    private String username;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "password_pm", nullable = false)
    private String password;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private List<Project> projects = new ArrayList<>();
    @Transient
    private String passwordConfirm;
    @OneToOne
    private Role role;

    public void setId (int id) {
        this.id = id;
    }

    public int getId () {
        return id;
    }

    public String getUsername () {
        return username;
    }

    @Override
    public boolean isAccountNonExpired () {
        return true;//было false
    }

    @Override
    public boolean isAccountNonLocked () {
        return true;//было false
    }

    @Override
    public boolean isCredentialsNonExpired () {
        return true;//было false
    }

    @Override
    public boolean isEnabled () {
        return true;//было false
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities () {
        return Collections.singleton(getRole());
    }

    public String getPassword () {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }

    public String getPasswordConfirm () {
        return passwordConfirm;
    }

    public void setPasswordConfirm (String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public List<Project> getProjects () {
        return projects;
    }

    public void setProjects (List<Project> projects) {
        this.projects = projects;
    }

    public void setRole (Role role) {
        this.role = role;
    }

    public Role getRole () {
        return role;
    }
/*
    @Override
    public int hashCode () {
        int result = id;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User that = (User) o;

        if (id != that.id) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;

        return true;
    }
*/
}
