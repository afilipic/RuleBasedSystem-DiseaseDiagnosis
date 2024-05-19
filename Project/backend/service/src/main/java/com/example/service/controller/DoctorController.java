package com.example.service.controller;

import com.example.model.BloodTestAnalysis;
import com.example.model.DTO.BloodTestDTO;
import com.example.model.DTO.SaveDiagnosisDTO;
import com.example.model.Diagnosis;
import com.example.model.EvaluationResult;
import com.example.service.service.BloodTestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value = "/api/doctor")
public class DoctorController {

    @Autowired
    BloodTestsService bloodTestsService;

    @PostMapping(
            value = "/getBloodTest",
            consumes = "application/json")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    public ResponseEntity getBloodTests(@RequestBody BloodTestDTO bloodTestDTO){
        try{
            List<BloodTestAnalysis> tests = bloodTestsService.getBloodTestAnalysis(bloodTestDTO);
            return new ResponseEntity<>(tests, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(
            value = "/saveBloodTests",
            consumes = "application/json")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    public ResponseEntity saveBloodTests(@RequestBody BloodTestDTO bloodTestDTO){
        try{
            List<BloodTestAnalysis> tests = bloodTestsService.saveBloodTestAnalysis(bloodTestDTO.getPatient(),bloodTestDTO.getTests());
            return new ResponseEntity<>(tests, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(
            value = "/evaluateTests",
            consumes = "application/json")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    public ResponseEntity evaluateTests(@RequestBody BloodTestDTO bloodTestDTO){
        try{
            EvaluationResult evaluationResult = bloodTestsService.checkTest(bloodTestDTO.getPatient());
            return new ResponseEntity<>(evaluationResult, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(
            value = "/saveDiagnosis",
            consumes = "application/json")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    public ResponseEntity saveDiagnosis(@RequestBody SaveDiagnosisDTO saveDiagnosisDTO){
        try{
            System.out.println(saveDiagnosisDTO);
            Diagnosis diagnosis = bloodTestsService.saveDiagnosis(saveDiagnosisDTO);
            return new ResponseEntity<>(diagnosis, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}