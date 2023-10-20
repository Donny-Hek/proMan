package com.pm.proman.service;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import com.pm.proman.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserDetailsServiceImpl userDetailsService;

//    @Transactional
    public Project addToUserUsingfindByUsername (String username, String name) {
        User localUser = (User) userDetailsService.loadUserByUsername(username);
        Project project = new Project(name, localUser);
        project = projectRepository.save(project);
        return project;
    }

}
