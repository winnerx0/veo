package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenDTO {

    @NotBlank(message = "Token must not be blank")
    String token;
}
