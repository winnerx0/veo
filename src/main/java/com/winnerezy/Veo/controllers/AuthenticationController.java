package com.winnerezy.Veo.controllers;

import com.winnerezy.Veo.responses.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
import com.winnerezy.Veo.services.AuthenticationService;
import com.winnerezy.Veo.services.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.util.Date;

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
        User registeredUser = authenticationService.register(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginUserDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String token = jwtService.generateToken(authenticatedUser);

            Cookie cookie = new Cookie("jwt", token);
            cookie.setPath("/");
            cookie.setMaxAge((int) (jwtService.getExpiration() / 1000));
            cookie.setHttpOnly(true);
            if (request.isSecure()) {
                cookie.setSecure(true);
            }
            response.addCookie(cookie);


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
    public boolean verifyToken(@Valid @RequestBody TokenDTO tokenDTO) {
        return authenticationService.verifyToken(tokenDTO.getToken());
    }

}
