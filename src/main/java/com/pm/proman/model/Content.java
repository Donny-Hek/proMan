package com.pm.proman.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "content")
public class Content {
    @Id
    private Long id;
//    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
//    @JoinColumn(name = "id_project")
//    private Project project; //список из заданий привязан к одному проекту
    @Column(name = "checked")
    private boolean checked;
    @Column(name = "contain")
    private String contain;
    @Column(name = "create_date")
    private Date create_date;

    public void setId (Long id) {
        this.id = id;
    }

    public Long getId () {
        return id;
    }

//    public Project getProject () {
//        return project;
//    }
//
//    public void setProject (Project project) {
//        this.project = project;
//    }

    public boolean isChecked () {
        return checked;
    }

    public void setChecked (boolean checked) {
        this.checked = checked;
    }

    public String getContain () {
        return contain;
    }

    public void setContain (String contain) {
        this.contain = contain;
    }

    public Date getCreate_date () {
        return create_date;
    }

    public void setCreate_date (Date create_date) {
        this.create_date = create_date;
    }
}
