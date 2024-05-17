package com.example.service.service;

import com.example.model.*;
import com.example.model.DTO.BloodTestDTO;
import com.example.service.repository.BloodTestAnalysisRepository;
import com.example.service.repository.DiseaseRepository;
import com.example.service.repository.PatientRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ResonerService {

    @Autowired
    private KieContainer kieContainer;
    @Autowired
    private DiseaseRepository diseaseRepository;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    BloodTestAnalysisRepository bloodTestAnalysisRepository;

    private void run(KieSession kieSession) {
        kieSession.fireAllRules();
        kieSession.dispose();
        kieSession.destroy();
    }


    public List<BloodTestAnalysis> bloodTestRequest(Patient patient, BloodTestDTO bloodTestDTO) {
        KieSession kieSession = this.kieContainer.newKieSession("myKieSession");
        List<Disease> allDiseases = diseaseRepository.findAll();
        kieSession.setGlobal("allDiseases", allDiseases);
        kieSession.getAgenda().getAgendaGroup("blood tests").setFocus();

        kieSession.insert(patient);
        kieSession.insert(bloodTestDTO);
        run(kieSession);

        patientRepository.save(patient);
        return bloodTestDTO.getTests();
    }



    public EvaluationResult diagnosisTestRequest(Patient patient) {
        KieSession kieSession = this.kieContainer.newKieSession("myKieSession");
        kieSession.getAgenda().getAgendaGroup("diagnosis tests").setFocus();
        kieSession.insert(patient);
        EvaluationResult evaluationResult = new EvaluationResult(patient);
        kieSession.insert(evaluationResult);
        run(kieSession);
        return evaluationResult;
    }


}