package com.pm.proman.controller;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import com.pm.proman.repository.ProjectRepository;
import com.pm.proman.repository.UserRepository;
import com.pm.proman.request_response.Content;
import com.pm.proman.request_response.MessageResponse;
import com.pm.proman.request_response.ProjectResponse;
import com.pm.proman.security.JwtUtils;
import com.pm.proman.service.ProjectService;
import com.pm.proman.service.UserDetailsImpl;
import com.pm.proman.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:8081")
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final JwtUtils jwtUtils;
    private final ProjectService projectService;
    private final UserRepository userRepository;

    @GetMapping("/user")
    public ResponseEntity<?> userAccess (@RequestHeader("Authorization") String token) {
        String username = this.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with username: " + username));
        List<Project> projects = user.getProjects();
        for (Project elem : projects) {
            elem.setContent(null);
        }
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProject (@RequestHeader("Authorization") String token, @RequestBody ProjectResponse projectResponse) {
        String username = this.getUsernameFromToken(token);
        Project project = projectService.addToUserUsingfindByUsername(username,
                                                                      projectResponse.getName(),
                                                                      projectResponse.getContent()); //создаем проект
        return ResponseEntity.ok(new ProjectResponse(project.getId(), project.getName()));
    }

    @GetMapping("/{pId}")
    public ResponseEntity<?> getProject (@PathVariable long pId, @RequestHeader("Authorization") String token) {
        String username = this.getUsernameFromToken(token);
        Project currProject = projectService.checkBelonging(pId, username);
        //выводим проект по его id и user-у, которому он принадлежит
        if (currProject == null)
            return ResponseEntity.badRequest().body(new MessageResponse("Error: project not belongs to user"));
        else
            return ResponseEntity.ok(
                    new ProjectResponse(currProject.getId(), currProject.getName(), currProject.getContent()));
    }

    @GetMapping("/del/{pId}")
    public Boolean deleteProject (@PathVariable long pId, @RequestHeader("Authorization") String token) {//, @RequestHeader("Authorization") String token
        String username = this.getUsernameFromToken(token);
        return projectService.deleteProject(pId, username);
//        return true;
    }

    public String getUsernameFromToken (String token) {
        String jwt = token.substring(7, token.length()); //очищаем токен
        return jwtUtils.getUserNameFromJwtToken(jwt); //извлекаем имя пользователя из токена
    }
}
