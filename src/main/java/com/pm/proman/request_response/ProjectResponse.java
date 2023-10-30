package com.pm.proman.request_response;

import lombok.*;

@Data
//@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private long id;
    private String name;
    private String content;

    public ProjectResponse (long id, String name) {
        this.id = id;
        this.name = name;
        this.content = "";
    }
}
