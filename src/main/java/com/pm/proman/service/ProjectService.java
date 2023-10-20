package com.pm.proman.service;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import com.pm.proman.repository.ProjectRepository;
import com.pm.proman.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

//    @Transactional
    public Project addToUserUsingfindByUsername (String username, String name) {
        User localUser = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with username: " + username));
        Project project = new Project(name, localUser);
        project = projectRepository.save(project);
        return project;
    }

}
