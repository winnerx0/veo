package com.winnerezy.Veo.services;

import java.util.Date;
import java.util.List;

import com.winnerezy.Veo.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.RegisterDTO;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterDTO registerDTO) {

        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setJoinedAt(new Date());

        return userRepository.save(user);
    }

    public User authenticate(LoginDTO loginDTO){

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        return userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    
}
