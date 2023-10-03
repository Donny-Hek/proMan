package com.pm.proman.repository;

import com.pm.proman.model.ERole;
import com.pm.proman.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName (ERole name);
}
