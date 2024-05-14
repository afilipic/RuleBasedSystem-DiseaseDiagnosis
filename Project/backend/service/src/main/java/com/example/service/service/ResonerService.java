package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Disease;
import com.example.model.Patient;
import com.example.model.enums.Symptoms;
import com.example.service.repository.DiseaseRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResonerService {

    private KieSession kieSession;

    @Autowired
    public ResonerService(KieContainer kieContainer, DiseaseRepository diseaseRepository) {
        this.kieSession = kieContainer.newKieSession("myKieSession");
        List<Disease> allDiseases = diseaseRepository.findAll();
        this.kieSession.setGlobal("allDiseases", allDiseases);
    }


    public List<BloodTestAnalysis> bloodTestRequest(Patient patient, List<Symptoms> symptoms) {
        this.kieSession.getAgenda().getAgendaGroup("blood tests").setFocus();
        this.kieSession.insert(patient);
        this.kieSession.insert(symptoms);
        this.kieSession.fireAllRules();
        return patient.getBloodTestAnalyses();

    }




}
