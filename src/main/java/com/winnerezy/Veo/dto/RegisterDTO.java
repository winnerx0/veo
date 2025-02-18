package com.winnerezy.Veo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {

   @NotBlank(message = "Enter a valid username")
   private String username;

   @NotBlank(message = "Email must not be blank")
   @Email(message = "Enter a valid email")
   private String email;

   @NotBlank(message = "Password must not be blank")
   @Size(min = 3, message = "Password has to be at least 3 characters")
   private String password;
}
