package tests;
import com.example.model.*;
import com.example.model.enums.BloodTestType;
import com.example.model.enums.Role;
import com.example.model.enums.Symptoms;
import org.drools.core.time.SessionPseudoClock;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CepTests {

    KieServices ks = KieServices.Factory.get();
    KieContainer kContainer = ks.getKieClasspathContainer();
    KieSession ksession = kContainer.newKieSession("cepRulesKsession");


    public Patient patient = new Patient(
            1, // id
            "tamara@gmail.com", // username
            "Tamara", // firstname
            "Dzambic", // lastname
            "+381644290420", // telephoneNumber
            "yourPassword", // password
            Role.PATIENT, // role (pretpostavimo da je `Role` enumeracija)
            true, // isActive
            LocalDate.of(1982, 5, 7), // birthDate
            "female", // gender
            174.0, // height
            61.0, // weight
            "A+", // bloodType
            new ArrayList<>(), // bloodTestAnalyses
            new HashSet<>(), // possibleDiseases
            new ArrayList<>(), // anamneses
            new ArrayList<>() // diagnoses
    );

    public User doctor = new User(
            2, // id
            "aleksandra@gmail.com", // username
            "Aleksandra", // firstname
            "Filipic", // lastname
            "+38164429094", // telephoneNumber
            "yourPassword", // password
            Role.DOCTOR, // role (pretpostavimo da je `Role` enumeracija)
            true // isActive
    );
    Disease graves = new Disease("Graves", "Graves disease");
    Diagnosis diagnosis = new Diagnosis(1L, LocalDate.now(), patient, graves, doctor);


    @Order(1)
    @Test
    public void testCEPRules() {
        KieServices ks = KieServices.Factory.get();
        KieContainer kContainer = ks.getKieClasspathContainer();
        KieSession ksession = kContainer.newKieSession("cepRulesKsession");

        //Bez alarma
        int firedRules = ksession.fireAllRules();
        assertEquals(0, firedRules);
    }

    @Test
    public void testThyroidRule(){
        //Alarm: Tiroidna kriza kod pacijenta Tamara Dzambic
        patient.addDiagnosis(diagnosis);
        ksession.insert(patient);
        List<Symptoms> symptoms = new ArrayList<>();
        symptoms.add(Symptoms.FEVER);
        symptoms.add(Symptoms.ELEVATED_BODY_TEMPERATURE);
        ksession.insert(symptoms);
        ksession.fireAllRules();
    }

    @Test
    public void testHypoglycemiaRule(){
        //Alarm: Hipoglikemija kod pacijenta Tamara Dzambic
        SessionPseudoClock clock = ksession.getSessionClock();

        for (int i = 0; i < 3; i++){
            int firedRules = ksession.fireAllRules();
            assertEquals(0, firedRules);
            BloodTestAnalysis test = new BloodTestAnalysis((long) i + 1, patient, BloodTestType.GLUCOSE, 50.0, "DONE", LocalDate.now().plusDays((long)i));
            ksession.insert(test);
            clock.advanceTime(1, TimeUnit.DAYS);
        }
        int firedRules = ksession.fireAllRules();
        assertEquals(2, firedRules);
    }


    @Test
    public void testHyperglycemiaRule(){
        //Alarm: Hiperglikemija kod pacijenta Tamara Dzambic
        SessionPseudoClock clock = ksession.getSessionClock();

        for (int i = 0; i < 3; i++){
            int firedRules = ksession.fireAllRules();
            assertEquals(0, firedRules);
            BloodTestAnalysis test = new BloodTestAnalysis((long) i + 1, patient, BloodTestType.GLUCOSE, 150.0, "DONE", LocalDate.now());
            ksession.insert(test);
            clock.advanceTime(1, TimeUnit.DAYS);
        }
        int firedRules = ksession.fireAllRules();
        assertEquals(2, firedRules);
    }

    @Test
    public void testKetoacidosisRule(){
        //Alarm: Dijabeticka ketoacidoza kod pacijenta Tamara Dzambic

           SessionPseudoClock clock = ksession.getSessionClock();

        for (int i = 0; i < 3; i++){
            int firedRules = ksession.fireAllRules();
            assertEquals(0, firedRules);

            BloodTestAnalysis test1 = new BloodTestAnalysis((long) i, patient, BloodTestType.GLUCOSE, 260.0, "DONE", LocalDate.now());
            BloodTestAnalysis test2 = new BloodTestAnalysis((long) i + 3, patient, BloodTestType.INSULIN, 3.0, "DONE", LocalDate.now());

            ksession.insert(test1);
            ksession.insert(test2);
            clock.advanceTime(1, TimeUnit.DAYS);
        }
        int firedRules = ksession.fireAllRules();
        assertEquals(3, firedRules);
    }

    @Test
    public void testNegativeKetoacidosisRule(){
        //Nema alarma, jer fali inslulin < 6.0
        SessionPseudoClock clock = ksession.getSessionClock();

        for (int i = 0; i < 3; i++){
            clock.advanceTime(0, TimeUnit.DAYS);
            int firedRules = ksession.fireAllRules();
            assertEquals(0, firedRules);
            BloodTestAnalysis test1 = new BloodTestAnalysis((long) i + 1, patient, BloodTestType.GLUCOSE, 260.0, "DONE", LocalDate.now());
            ksession.insert(test1);
        }
        int firedRules = ksession.fireAllRules();
        assertEquals(1, firedRules);
    }

}
