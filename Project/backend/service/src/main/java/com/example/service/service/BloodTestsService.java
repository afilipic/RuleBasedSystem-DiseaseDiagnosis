package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Diagnosis;
import com.example.model.EvaluationResult;
import com.example.model.Patient;
import com.example.model.DTO.BloodTestDTO;
import com.example.service.repository.BloodTestAnalysisRepository;
import com.example.service.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BloodTestsService {
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

    public List<BloodTestAnalysis> saveBloodTestResult(BloodTestDTO testDTO) {
        Patient patient = patientRepository.findOneByUsername(testDTO.getPatient()).get();

        List<BloodTestAnalysis> newTests = new ArrayList<>();

        for (BloodTestAnalysis bloodTestAnalysis : testDTO.getTests()) {
            bloodTestAnalysis.setStatus("DONE");
            bloodTestAnalysis.setPatient(patient);
            newTests.add(bloodTestAnalysis);
        }
        List<BloodTestAnalysis> bloodTestAnalysisList = bloodTestAnalysisRepository.saveAll(newTests);
        System.out.println(patient.getBloodTestAnalyses());
        this.resonerService.cepTest(patient, newTests);
        return bloodTestAnalysisList;
    }

    public List<BloodTestAnalysis> getAllPendingTests() {
        return bloodTestAnalysisRepository.findBloodTestAnalysesByStatus("PENDING");
    }

    public EvaluationResult checkTest(String patientUsername){
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        return resonerService.diagnosisTestRequest(patient);
    }

}