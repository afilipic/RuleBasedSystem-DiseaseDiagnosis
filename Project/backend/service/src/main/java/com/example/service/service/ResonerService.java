package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Patient;
import com.example.model.enums.Symptoms;
import com.example.service.repository.BloodTestAnalysisRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResonerService {
    @Autowired
    private KieContainer kieContainer;

    @Autowired
    private BloodTestAnalysisRepository bloodTestAnalysisRepository;


    private void run(KieSession kieSession) {
        kieSession.fireAllRules();
        kieSession.dispose();
        kieSession.destroy();
    }


    public List<BloodTestAnalysis> bloodTestRequest(Patient patient, List<Symptoms> symptoms) {
        KieSession kieSession = this.kieContainer.newKieSession("blood-test-rules");
        kieSession.insert(patient);
        kieSession.insert(symptoms);
        this.run(kieSession);
        List<BloodTestAnalysis> tests =  patient.getBloodTestAnalyses();
//        tests = bloodTestAnalysisRepository.saveAll(tests);
        return tests;

    }




}
