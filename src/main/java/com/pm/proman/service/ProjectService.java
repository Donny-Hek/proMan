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
    public Project addToUserUsingfindByUsername (String username, String name, String content) {
        User localUser = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with username: " + username));
        Project project = new Project(name, localUser, content);
        project = projectRepository.save(project);
        return project;
    }

    public Project checkBelonging (Long pId, String username) {
        return projectRepository.findByIdAndUser(username, pId);
    }

    public Project updateContent (Long pId, String username, String content) {
        Project project = projectRepository.findByIdAndUser(username, pId);
        projectRepository.updateProjectById(content, project.getId());
        project = projectRepository.findByIdAndUser(username, pId);
        return project;
    }

    public boolean deleteProject (Long pId, String username) {
        if (this.checkBelonging(pId, username) != null) {
            projectRepository.deleteById(pId);
            return true;
        } else return false;
    }
}
