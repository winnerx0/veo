package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Password must not be blank")
    private String password;
}
