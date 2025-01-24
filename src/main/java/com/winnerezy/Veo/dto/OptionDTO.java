package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OptionDTO {

    @NotBlank(message = "Enter a valid name")
    @Size(max = 10, message = "Maximum length of 10 characters")
    private String name;
}
