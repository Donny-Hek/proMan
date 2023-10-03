package com.pm.proman.repository;

import com.pm.proman.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByNickname (String username);

    Boolean existsByNickname (String username);

    Boolean existsByEmail (String email);
}
