package com.example.service.controller;


import com.example.model.BloodTestAnalysis;
import com.example.model.DTO.PatientDTO;
import com.example.service.service.BloodTestsService;
import com.example.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value = "/api/technician")
public class TechnicianController {

    @Autowired
    BloodTestsService bloodTestsService;

    @GetMapping(value = "/pending")
    @PreAuthorize("hasAnyAuthority('TECHNICIAN')")
    public ResponseEntity getAllPendingTests(){

        try{
            List<BloodTestAnalysis> patients = bloodTestsService.getAllPendingTests();
            return new ResponseEntity<>(patients, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
