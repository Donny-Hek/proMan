package com.pm.proman.repository;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
//    List<Project> findByUserId();

//    @Query("")
//    List<Project> findAllByUser ();
}
