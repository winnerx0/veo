package com.winnerezy.Veo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.services.UserService;

@RequestMapping( "api/v1/users")
@RestController
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/me")
    public User getCurrentUser() {
        return userService.getCurrentUser();
    }
    
}
