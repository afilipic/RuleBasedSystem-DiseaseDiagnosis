package com.example.service.service;

import com.example.model.*;
import com.example.model.DTO.AnamnesisDTO;
import com.example.model.DTO.BloodTestDTO;
import com.example.model.enums.BackwardType;
import com.example.model.enums.Symptoms;
import com.example.service.repository.BloodTestAnalysisRepository;
import com.example.service.repository.DiseaseRepository;
import com.example.service.repository.PatientRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
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
        kieSession.insert(bloodTestDTO.getSymptoms());

        kieSession.insert(bloodTestDTO);
        run(kieSession);

        patientRepository.save(patient);
        return bloodTestDTO.getTests();
    }



    public void cepTest(List<BloodTestAnalysis> tests) {
        KieSession kieSession = this.kieContainer.newKieSession("myKieSession");
        for (BloodTestAnalysis bloodTestAnalysis : tests) {
            kieSession.insert(bloodTestAnalysis);
        }
        run(kieSession);
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

    public Set<String> backwardTest(AnamnesisDTO anamnesisDTO){
        KieSession kieSession = this.kieContainer.newKieSession("myKieSession");
        kieSession.getAgenda().getAgendaGroup("backward tests").setFocus();
        List<String> symptoms = anamnesisDTO.getSymptoms();

//        symptoms.add("genetika");
//        symptoms.add("stres");
//        symptoms.add("alkohol");
//        symptoms.add("oftalmopatija");

        kieSession.insert(symptoms);

        Set<String> diseases = new HashSet<>();
        kieSession.insert(diseases);

        kieSession.insert(new BackwardModel("genetika", "stres", BackwardType.FACTOR));
        kieSession.insert(new BackwardModel("genetika", "oftalmopatija", BackwardType.FACTOR));

        kieSession.insert(new BackwardModel("stres", "problem sa bubrezima", BackwardType.SYMPTOM));
        kieSession.insert(new BackwardModel("stres", "druge autoimune bolesti", BackwardType.SYMPTOM));

        kieSession.insert(new BackwardModel("problem sa bubrezima", "sistemski eritemski lupus", BackwardType.DISEASE));
        kieSession.insert(new BackwardModel("problem sa bubrezima", "reumatoidni artritis", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel("druge autoimune bolesti", "zenski pol", BackwardType.FACTOR));
        kieSession.insert(new BackwardModel("druge autoimune bolesti", "alkohol", BackwardType.FACTOR));

        kieSession.insert(new BackwardModel("zenski pol", "Hasimoto tireoiditis", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel("alkohol", "cigarete", BackwardType.FACTOR));
        kieSession.insert(new BackwardModel("cigarete", "manja kilaza", BackwardType.FACTOR));
        kieSession.insert(new BackwardModel("manja kilaza", "diabetes tipa 1", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel("oftalmopatija", "starost", BackwardType.FACTOR));
        kieSession.insert(new BackwardModel("starost", "Gravesova bolest", BackwardType.DISEASE));


        run(kieSession);
        return diseases;
    }




}