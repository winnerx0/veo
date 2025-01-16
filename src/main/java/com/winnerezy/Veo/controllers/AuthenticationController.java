package com.winnerezy.Veo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.winnerezy.Veo.dto.LoginDTO;
import com.winnerezy.Veo.dto.RegisterDTO;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.services.AuthenticationService;
import com.winnerezy.Veo.services.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/v1/auth", method = RequestMethod.POST)
public class AuthenticationController {
    
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerUserDto, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
     try {
         System.out.println("Registering user with details: " + registerUserDto);
         User registeredUser = authenticationService.register(registerUserDto);

         return ResponseEntity.ok(registeredUser);
     } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity
                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
                 .body(e.getMessage());
     }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO loginUserDto, HttpServletResponse response) {
       try {
           User authenticatedUser = authenticationService.authenticate(loginUserDto);

           System.out.println(authenticatedUser);

           String jwtToken = jwtService.generateToken(authenticatedUser);

           Cookie cookie = new Cookie("token", jwtToken);
           cookie.setHttpOnly(true);
           cookie.setPath("/");
           cookie.setSecure(true);
           cookie.setMaxAge((int) jwtService.getExpiration());

           response.addCookie(cookie);

           return ResponseEntity.ok(jwtToken);
       } catch (BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
       } catch (RuntimeException ex) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
       } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication Failed");
    }
    }

}
