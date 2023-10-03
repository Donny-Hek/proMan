package com.pm.proman.request_response;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
//@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private int id;
    private String username;
    private String email;
    private List<String> roles;
}
