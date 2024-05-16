package com.example.service.service;

import com.example.model.BloodTestAnalysis;
import com.example.model.Disease;
import com.example.model.Patient;
import com.example.model.DTO.BloodTestDTO;
import com.example.service.repository.DiseaseRepository;
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
    private DiseaseRepository diseaseRepository;

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
        System.out.println(bloodTestDTO);
        run(kieSession);

        return bloodTestDTO.getTests();

    }




}
