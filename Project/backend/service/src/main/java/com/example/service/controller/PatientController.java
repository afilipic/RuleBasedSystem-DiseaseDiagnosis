package com.example.service.controller;

import com.example.model.Patient;
import com.example.service.DTO.PatientDTO;
import com.example.service.DTO.UserDTO;
import com.example.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/all")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'ADMIN', 'TECHNICIAN')")
    public ResponseEntity getAllPatients(){

        try{
            List<PatientDTO> patients = userService.getAllPatients();
            return new ResponseEntity<>(patients, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
}
