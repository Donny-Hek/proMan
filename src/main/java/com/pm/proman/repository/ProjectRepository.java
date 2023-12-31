package com.pm.proman.repository;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select p from Project p where p.user.username=:username and p.id=:pId")
    Project findByIdAndUser(@Param("username") String username, @Param("pId") long pId);

    @Modifying
    @Transactional
    @Query("update Project p set p.content=:content where p.id=:pId")
    void updateProjectById(@Param("content") String content, @Param("pId") long pId);
//    Boolean deleteProjectById(Long id);
}
