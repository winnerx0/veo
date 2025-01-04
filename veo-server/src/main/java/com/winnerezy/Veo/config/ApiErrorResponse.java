package com.winnerezy.Veo.config;

import lombok.Getter;

@Getter
public class ApiErrorResponse {

    private int code;
    private String message;

    public ApiErrorResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

