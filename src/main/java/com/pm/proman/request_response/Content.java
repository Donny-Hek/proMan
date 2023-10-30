package com.pm.proman.request_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.PrimitiveIterator;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class Content {
    private String ToDo;
    private String InProgress;
    private String Completed;
}
