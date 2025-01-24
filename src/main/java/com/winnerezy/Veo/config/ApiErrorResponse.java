package com.winnerezy.Veo.config;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiErrorResponse {

    private String message;

    public ApiErrorResponse(String message) {
        this.message = message;
    }
}

