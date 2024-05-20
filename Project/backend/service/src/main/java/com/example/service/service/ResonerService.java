package com.example.service.service;

import com.example.model.*;
import com.example.model.DTO.AnamnesisDTO;
import com.example.model.DTO.BloodTestDTO;
import com.example.model.enums.Anamnesis;
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

    public Set<String> backwardTest(Patient patient){
        KieSession kieSession = this.kieContainer.newKieSession("myKieSession");
        kieSession.getAgenda().getAgendaGroup("backward tests").setFocus();
        List<String> symptoms = new ArrayList<>();
        for (Anamnesis anamnesis : patient.getAnamneses()) {
            symptoms.add(anamnesis.toString());
        }

        kieSession.insert(symptoms);

        Set<String> diseases = new HashSet<>();
        kieSession.insert(diseases);

        kieSession.insert(new BackwardModel(Anamnesis.GENETICS.name(), Anamnesis.STRESS.name(), BackwardType.FACTOR));
        kieSession.insert(new BackwardModel(Anamnesis.GENETICS.name(), Anamnesis.OPHTHALMOPATHY.name(), BackwardType.FACTOR));

        kieSession.insert(new BackwardModel(Anamnesis.STRESS.name(), Anamnesis.KIDNEY_PROBLEM.name(), BackwardType.SYMPTOM));
        kieSession.insert(new BackwardModel(Anamnesis.STRESS.name(), Anamnesis.OTHER_AUTOIMMUNE_DISEASES.name(), BackwardType.SYMPTOM));

        kieSession.insert(new BackwardModel(Anamnesis.KIDNEY_PROBLEM.name(), "SLE", BackwardType.DISEASE));
        kieSession.insert(new BackwardModel(Anamnesis.KIDNEY_PROBLEM.name(), "RA", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel(Anamnesis.OTHER_AUTOIMMUNE_DISEASES.name(), Anamnesis.FEMALE_GENDER.name(), BackwardType.FACTOR));
        kieSession.insert(new BackwardModel(Anamnesis.OTHER_AUTOIMMUNE_DISEASES.name(), Anamnesis.ALCOHOL.name(), BackwardType.FACTOR));

        kieSession.insert(new BackwardModel(Anamnesis.FEMALE_GENDER.name(), "Hashimoto", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel(Anamnesis.ALCOHOL.name(), Anamnesis.CIGARETTES.name(), BackwardType.FACTOR));
        kieSession.insert(new BackwardModel(Anamnesis.CIGARETTES.name(), Anamnesis.LOWER_WEIGHT.name(), BackwardType.FACTOR));
        kieSession.insert(new BackwardModel(Anamnesis.LOWER_WEIGHT.name(), "Type 1 Diabetes", BackwardType.DISEASE));

        kieSession.insert(new BackwardModel(Anamnesis.OPHTHALMOPATHY.name(), Anamnesis.AGE.name(), BackwardType.FACTOR));
        kieSession.insert(new BackwardModel(Anamnesis.AGE.name(), "Graves", BackwardType.DISEASE));


        run(kieSession);
        return diseases;
    }




}