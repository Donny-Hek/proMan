package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "state")
    private String state;
    @Column(name = "name_project")
    private String name;
    @Column(name = "content")
    private String content;

    public void setId (int id) {
        this.id = id;
    }

    public int getId () {
        return id;
    }

    public String getState () {
        return state;
    }

    public void setState (String state) {
        this.state = state;
    }

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getContent () {
        return content;
    }

    public void setContent (String content) {
        this.content = content;
    }
}
