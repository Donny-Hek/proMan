package com.pm.proman.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue
    @Column(name = "id_project")
    private long id;
    @Column(name = "name_project")
    private String name; //конструктор
    @Column(name = "content")
    private String content;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "id_pm")
    @JsonIgnore
    private User user;

    public Project (String name, User user) {
        this.name = name;
        this.user = user;
    }
}
