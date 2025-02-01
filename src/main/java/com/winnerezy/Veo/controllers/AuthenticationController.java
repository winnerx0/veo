package com.winnerezy.Veo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.winnerezy.Veo.dto.LoginDTO;
import com.winnerezy.Veo.dto.RegisterDTO;
import com.winnerezy.Veo.dto.TokenDTO;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.responses.LoginResponse;
import com.winnerezy.Veo.services.AuthenticationService;
import com.winnerezy.Veo.services.JwtService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/v1/auth", method = RequestMethod.POST)
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final JwtService jwtService;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerUserDto) {
        try {
            User registeredUser = authenticationService.register(registerUserDto);

            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginUserDto) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String token = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse(token, jwtService.getExpiration());
            return ResponseEntity.ok(loginResponse);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication Failed");
        }
    }

    @PostMapping("/verify-token")
    public boolean verifyToken(@RequestBody TokenDTO tokenDTO) {
        return authenticationService.verifyToken(tokenDTO.getToken());
    }

}
