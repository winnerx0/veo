package com.winnerezy.Veo.controllers;

import com.winnerezy.Veo.models.User;
import com.winnerezy.Veo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public String me(){
        return "Me";
    }

}
