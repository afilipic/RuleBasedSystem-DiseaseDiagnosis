package com.example.service.service;

import lombok.AllArgsConstructor;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResonerService {
    @Autowired
    private KieContainer kieContainer;

    private void run(KieSession kieSession) {
        kieSession.fireAllRules();
        kieSession.dispose();
        kieSession.destroy();
    }

    public void testCep() {
        KieSession kieSession = this.kieContainer.newKieSession("cep-rules");
        String response = new String();
        kieSession.insert(response);
        this.run(kieSession);
        System.out.println(response);
    }

    public void testBackwrards() {
        KieSession kieSession = this.kieContainer.newKieSession("backward-rules");
        String response = new String();
        kieSession.insert(response);
        this.run(kieSession);
        System.out.println(response);
    }




}
