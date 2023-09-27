package com.pm.proman.model;

import jakarta.persistence.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
@Entity
public class Role implements GrantedAuthority {
    @jakarta.persistence.Id
    @Id
    private int id;
    private String name;
    private String email;

    public Role (int id, String roleUser) {
        setId(id);
        setName(roleUser);
    }

    public Role () {

    }

    public void setName (String name) {
        this.name = name;
    }

    public String getName () {
        return name;
    }

    public void setEmail (String email) {
        this.email = email;
    }

    @Override
    public String getAuthority () {
        return getName();
    }

    public void setId (int id) {
        this.id = id;
    }

    public int getId () {
        return id;
    }
}