package com.example.service.controller;


import com.example.service.DTO.LoginDTO;
import com.example.service.DTO.TokenDTO;
import com.example.service.DTO.UserDTO;
import com.example.service.service.JWTService;
import com.example.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value = "/api/user")
public class AuthController {

    @Autowired
    JWTService jwtProvider;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;

    @PostMapping(
            value = "/register",
            consumes = "application/json")
    public ResponseEntity registration(@RequestBody UserDTO userDTO){

        try{
            userService.createNewPatient(userDTO);
            return new ResponseEntity<>("Check your email", HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping(value = "/activate/{userId}")
    public ResponseEntity activateAccount(@PathVariable Integer userId) {
        userService.activate(userId);
        return new ResponseEntity<>("Successfully activated", HttpStatus.OK);
    }


    @PostMapping(
            value = "/login",
            consumes = "application/json")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO){
        try {

            TokenDTO auth = userService.login(loginDTO.getUsername(), loginDTO.getPassword());
            return new ResponseEntity<>(auth, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        }
    }



}