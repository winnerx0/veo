package com.winnerezy.Veo.services;

import java.time.LocalDate;
import java.util.Optional;

import com.winnerezy.Veo.enums.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.winnerezy.Veo.dto.LoginDTO;
import com.winnerezy.Veo.dto.RegisterDTO;
import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.repositories.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationProvider authenticationProvider;

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationProvider authenticationProvider,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        UserDetailsService userDetailsService
    ) {
        this.authenticationProvider = authenticationProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    public User register(RegisterDTO registerDTO) {

        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setJoinedAt(LocalDate.now());

        return userRepository.save(user);
    }

    public User authenticate(LoginDTO loginDTO){

        User user = userRepository.findByEmail(loginDTO.getEmail()).orElse(null);

        if(user == null){
            throw  new RuntimeException("User not found");
        }
        authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        return user;

    }

    public boolean verifyToken(String token){

      try {
          if(token.isEmpty()){
              return false;
          }

          boolean validToken = jwtService.isTokenValid(token, userDetailsService.loadUserByUsername(jwtService.extractUsername(token)));

          if(!validToken){
              return false;
          }

          Optional<User> user = userRepository.findByEmail(jwtService.extractUsername(token));

          return user.isPresent();
      } catch (Exception e) {
         return false;
      }

    }

    public String deleteAccount(String email) {

        if(!userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("No User Found");
        }

       
        userRepository.deleteByEmail(email);
        return "Deleted Sucessfully";
    }
    
}
