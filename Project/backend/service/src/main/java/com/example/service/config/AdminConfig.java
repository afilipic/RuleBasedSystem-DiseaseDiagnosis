package com.example.service.config;

import com.example.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminConfig implements ApplicationRunner {

    @Autowired
    private UserService userService;
    @Override
    public void run(ApplicationArguments args) {
        userService.createAdmin();

    }
}


