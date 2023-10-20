package com.pm.proman.controller;

import com.pm.proman.model.Project;
import com.pm.proman.request_response.ProjectResponse;
import com.pm.proman.security.JwtUtils;
import com.pm.proman.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:8081")
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final JwtUtils jwtUtils;
    private final ProjectService projectService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess () {
        //тут будет список проектов выводиться

        return ResponseEntity.ok("User Content.");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProject (@RequestHeader("Authorization") String toke, @RequestBody String nameProject) {
        String jwt = toke.substring(7, toke.length()); //очищаем токен
        String username = jwtUtils.getUserNameFromJwtToken(jwt); //извлекаем имя пользователя из токена
        Project project = projectService.addToUserUsingfindByUsername(username, nameProject); //создаем проект
        return ResponseEntity.ok(new ProjectResponse(project.getId(), project.getName(), project.getContent()));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getProjects (@RequestHeader("Authorization") String toke) {
        String jwt = toke.substring(7, toke.length());
        String username = jwtUtils.getUserNameFromJwtToken(jwt);

        return ResponseEntity.ok("ok");
    }
}
