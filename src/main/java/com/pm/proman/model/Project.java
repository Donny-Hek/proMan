package com.pm.proman.model;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_project")
    private long id;
    @Column(name = "name_project")
    private String name;
    @Column(name = "content")
    private String content;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "id_pm")
    private User user;

//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "project")
//    private List<Content> content = new ArrayList<>();

//    public void setId (int id) {
//        this.id = id;
//    }
//
//    public int getId () {
//        return id;
//    }
//
//
//    public String getName () {
//        return name;
//    }
//
//    public void setName (String name) {
//        this.name = name;
//    }

//    public String getContent () {
//        return content;
//    }
//
//    public void setContent (String content) {
//        this.content = content;
//    }

/*
    @Override
    public int hashCode () {
        int result = id;
        result = 31 * result + id;
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Project that = (Project) o;

        if (id != that.id) return false;
        if (id != that.id) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;

        return true;
    }
*/
}
