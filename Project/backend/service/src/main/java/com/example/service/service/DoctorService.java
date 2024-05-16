package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Patient;
import com.example.model.DTO.BloodTestDTO;
import com.example.service.repository.BloodTestAnalysisRepository;
import com.example.service.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorService {
    @Autowired
    ResonerService resonerService;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    BloodTestAnalysisRepository bloodTestAnalysisRepository;

    public List<BloodTestAnalysis> getBloodTestAnalysis(BloodTestDTO bloodTestDTO) {
        Patient patient = patientRepository.findOneByUsername(bloodTestDTO.getPatient()).get();
        return resonerService.bloodTestRequest(patient, bloodTestDTO);
    }

    public List<BloodTestAnalysis> saveBloodTestAnalysis(String patientUsername,List<BloodTestAnalysis> tests) {
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        List<BloodTestAnalysis> newTests = new ArrayList<>();

        for (BloodTestAnalysis bloodTestAnalysis : tests) {
            boolean exists = bloodTestAnalysisRepository.existsByPatientAndTypeAndDate(patient, bloodTestAnalysis.getType(), bloodTestAnalysis.getDate());
            if (!exists) {
                bloodTestAnalysis.setPatient(patient);
                newTests.add(bloodTestAnalysis);
            }
        }
        return bloodTestAnalysisRepository.saveAll(newTests);
    }

}
