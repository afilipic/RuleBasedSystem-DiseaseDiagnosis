package tests;

import com.example.model.BackwardModel;
import com.example.model.enums.BackwardType;
import org.junit.jupiter.api.Test;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class BackwardTest {

    @Test
    public void testBackward() throws InterruptedException {
        KieSession ksession = prepare();


    }

    private KieSession prepare(){
        KieServices ks = KieServices.Factory.get();
        KieContainer kContainer = ks.getKieClasspathContainer();
        KieSession ksession = kContainer.newKieSession("backwardRulesKsession");
        List<String> symptoms = new ArrayList<>();

//        symptoms.add("genetika");
//        symptoms.add("stres");
        symptoms.add("alkohol");
        symptoms.add("oftalmopatija");

        ksession.insert(symptoms);

        Set<String> diseases = new HashSet<>();
        ksession.insert(diseases);

        ksession.insert(new BackwardModel("genetika", "stres", BackwardType.FACTOR));
        ksession.insert(new BackwardModel("genetika", "oftalmopatija", BackwardType.FACTOR));

        ksession.insert(new BackwardModel("stres", "problem sa bubrezima", BackwardType.SYMPTOM));
        ksession.insert(new BackwardModel("stres", "druge autoimune bolesti", BackwardType.SYMPTOM));

        ksession.insert(new BackwardModel("problem sa bubrezima", "sistemski eritemski lupus", BackwardType.DISEASE));
        ksession.insert(new BackwardModel("problem sa bubrezima", "reumatoidni artritis", BackwardType.DISEASE));

        ksession.insert(new BackwardModel("druge autoimune bolesti", "zenski pol", BackwardType.FACTOR));
        ksession.insert(new BackwardModel("druge autoimune bolesti", "alkohol", BackwardType.FACTOR));

        ksession.insert(new BackwardModel("zenski pol", "Hasimoto tireoiditis", BackwardType.DISEASE));

        ksession.insert(new BackwardModel("alkohol", "cigarete", BackwardType.FACTOR));
        ksession.insert(new BackwardModel("cigarete", "manja kilaza", BackwardType.FACTOR));
        ksession.insert(new BackwardModel("manja kilaza", "diabetes tipa 1", BackwardType.DISEASE));

        ksession.insert(new BackwardModel("oftalmopatija", "starost", BackwardType.FACTOR));
        ksession.insert(new BackwardModel("starost", "Gravesova bolest", BackwardType.DISEASE));

        ksession.fireAllRules();
        System.out.println(diseases);
        return ksession;
    }
}
