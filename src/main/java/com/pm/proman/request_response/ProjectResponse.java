package com.pm.proman.request_response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProjectResponse {
    private long id;
    private String name;
    private String content;
}
