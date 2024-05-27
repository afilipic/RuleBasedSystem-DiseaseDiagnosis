package tests;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

import org.drools.decisiontable.ExternalSpreadsheetCompiler;
import org.junit.jupiter.api.Test;
import org.kie.api.builder.Message;
import org.kie.api.builder.Results;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.internal.utils.KieHelper;

import com.example.model.BloodTestAnalysis;
import com.example.model.Diagnosis;
import com.example.model.Disease;
import com.example.model.Patient;
import com.example.model.PossibleDisease;
import com.example.model.Therapy;
import com.example.model.User;
import com.example.model.enums.BloodTestType;

public class TemplateTest {

    @Test
    public void testSimpleTemplateWithSpreadsheet2() throws Exception {
        InputStream template = TemplateTest.class.getResourceAsStream("/templates/disease-simple.drt");
        if (template == null) {
            throw new IllegalArgumentException("Template not found");
        }

        InputStream data = TemplateTest.class.getResourceAsStream("/templates/template-data.xls");
        if (data == null) {
            throw new IllegalArgumentException("Data file not found");
        }
        ExternalSpreadsheetCompiler converter = new ExternalSpreadsheetCompiler();
        String drl = converter.compile(data, template, 3, 2);

        System.out.println(drl);

        KieSession ksession = createKieSessionFromDRL(drl);


        // Initialize and insert test data
        Patient patient = new Patient();
        patient.setId(4); // Assuming there's an ID field in Patient class
        patient.setGender("male");

        Disease hashimoto = new Disease();
        hashimoto.setName("Hashimoto");

        BloodTestAnalysis tshTest = new BloodTestAnalysis(BloodTestType.TSH, patient);
        tshTest.setStatus("DONE");
        tshTest.setValue(4.5);
        tshTest.setDate(LocalDate.now().minusDays(3));

        BloodTestAnalysis t3Test = new BloodTestAnalysis(BloodTestType.T3, patient);
        t3Test.setStatus("DONE");
        t3Test.setValue(70.0);
        t3Test.setDate(LocalDate.now().minusDays(3));

        Diagnosis diagnosis = new Diagnosis();
        diagnosis.setDate(LocalDate.now());
        diagnosis.setPatient(patient);
        diagnosis.setDisease(hashimoto);
        // Insert diagnosis into KieSession
        ksession.insert(diagnosis);

        // Insert patient and tests into KieSession
        ksession.insert(patient);
        ksession.insert(hashimoto);
        ksession.insert(tshTest);
        ksession.insert(t3Test);

        // Fire all rules
        ksession.fireAllRules();


    }

    private KieSession createKieSessionFromDRL(String drl){
        KieHelper kieHelper = new KieHelper();
        kieHelper.addContent(drl, ResourceType.DRL);

        Results results = kieHelper.verify();

        if (results.hasMessages(Message.Level.WARNING, Message.Level.ERROR)){
            List<Message> messages = results.getMessages(Message.Level.WARNING, Message.Level.ERROR);
            for (Message message : messages) {
                System.out.println("Error: " + message.getText());
            }

            throw new IllegalStateException("Compilation errors were found. Check the logs.");
        }

        return kieHelper.build().newKieSession();
    }

    private void assertTrue(boolean condition) {
        if (!condition) {
            throw new AssertionError("Test assertion failed");
        }
    }
}
