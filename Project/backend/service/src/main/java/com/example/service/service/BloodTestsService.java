package com.example.service.service;

import com.example.model.*;
import com.example.model.DTO.AnamnesisDTO;
import com.example.model.DTO.SaveDiagnosisDTO;
import com.example.model.DTO.BloodTestDTO;
import com.example.service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class BloodTestsService {
    @Autowired
    ResonerService resonerService;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    BloodTestAnalysisRepository bloodTestAnalysisRepository;
    @Autowired
    private DiseaseRepository diseaseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DiagnosisRepository diagnosisRepository;

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
        this.resonerService.cepTest(newTests);
        return bloodTestAnalysisRepository.saveAll(newTests);
    }

    public List<BloodTestAnalysis> getAllPendingTests() {
        return bloodTestAnalysisRepository.findBloodTestAnalysesByStatus("PENDING");
    }

    public EvaluationResult checkTest(String patientUsername){
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        return resonerService.diagnosisTestRequest(patient);
    }

    public Set<String> checkBackwardsTest(String patientUsername){
        Patient patient = patientRepository.findOneByUsername(patientUsername).get();
        return resonerService.backwardTest(patient);
    }

    public Diagnosis saveDiagnosis(SaveDiagnosisDTO saveDiagnosisDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User doctor = userRepository.findOneByUsername(username).get();

        Patient patient = patientRepository.findOneByUsername(saveDiagnosisDTO.getPatient()).get();
        Disease disease = diseaseRepository.findOneByName(saveDiagnosisDTO.getDiagnosisName()).get();

        patient.getPossibleDiseases().remove(disease);
        patientRepository.save(patient);

        Diagnosis newDiagnosis = new Diagnosis();
        newDiagnosis.setPatient(patient);
        newDiagnosis.setDate(LocalDate.now());
        newDiagnosis.setDisease(disease);
        newDiagnosis.setDoctor(doctor);

        return diagnosisRepository.save(newDiagnosis);
    }



}