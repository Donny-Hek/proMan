package com.pm.proman.controller;

import com.pm.proman.model.Project;
import com.pm.proman.model.User;
import com.pm.proman.repository.ProjectRepository;
import com.pm.proman.repository.UserRepository;
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

import java.util.Optional;

@CrossOrigin(value = "http://localhost:8081")
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final JwtUtils jwtUtils;
    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess (@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7, token.length());
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with username: " + username));
        return ResponseEntity.ok(user.getProjects());
//        return ResponseEntity.ok("User Content.");
    }

    @PostMapping("/add") //работает
    public ResponseEntity<?> addProject (@RequestHeader("Authorization") String token, @RequestBody ProjectResponse projectResponse) {
        String jwt = token.substring(7, token.length()); //очищаем токен
        String username = jwtUtils.getUserNameFromJwtToken(jwt); //извлекаем имя пользователя из токена
        Project project = projectService.addToUserUsingfindByUsername(username,
                                                                      projectResponse.getName()); //создаем проект
        return ResponseEntity.ok(new ProjectResponse(project.getId(), project.getName()));
    }
}
