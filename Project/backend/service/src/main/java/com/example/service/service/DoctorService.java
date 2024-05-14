package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Patient;
import com.example.model.enums.Symptoms;
import com.example.service.repository.BloodTestAnalysisRepository;
import com.example.service.repository.PatientRepository;
import com.example.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    ResonerService resonerService;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    BloodTestAnalysisRepository bloodTestAnalysisRepository;

    public List<BloodTestAnalysis> getBloodTestAnalysis(String patientUsername, List<Symptoms> symptoms) {
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        return resonerService.bloodTestRequest(patient, symptoms);
    }

    public List<BloodTestAnalysis> saveBloodTestAnalysis(String patientUsername,List<BloodTestAnalysis> tests) {
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        for (BloodTestAnalysis bloodTestAnalysis : tests) {
            bloodTestAnalysis.setPatient(patient);
        }
        return bloodTestAnalysisRepository.saveAll(tests);
    }

}
