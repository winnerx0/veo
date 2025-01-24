package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {

   @NotBlank(message = "Enter a valid username")
   @Size(min = 8, max = 20, message = "username must be between 8 and 20 characters")
   private String username;

   @NotBlank(message = "Email must not be blank")
   @Email(message = "Enter a valid email")
   private String email;

   @NotBlank(message = "Password must not be blank")
   @Size(min = 5, max = 10, message = "Password must be between 5 and 10 characters")
   private String password;
}
