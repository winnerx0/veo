package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {

   @NotBlank(message = "Username cannot be empty")
   private String username;

   @NotBlank(message = "Email cannot be empty")
   @Email(message = "Please provide a valid email")
   private String email;

   @NotBlank(message = "Password cannot be empty")
   @Size(min = 3, max = 10, message = "Password must be between 3 and 10 characters")
   private String password;
}
