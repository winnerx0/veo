package com.winnerezy.Veo.responses;

public class ApiErrorResponse extends RuntimeException {

    public ApiErrorResponse(String message) {
        super(message);
    }
}

