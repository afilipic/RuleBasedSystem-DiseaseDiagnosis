package tests;

import com.example.model.BackwardModel;
import com.example.model.enums.BackwardType;
import org.junit.jupiter.api.Test;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class BackwardTest {

    @Test
    public void testBackward() throws InterruptedException {
        KieSession ksession = prepare();

        ksession.fireAllRules();
    }

    private KieSession prepare(){
        KieServices ks = KieServices.Factory.get();
        KieContainer kContainer = ks.getKieClasspathContainer();
        KieSession ksession = kContainer.newKieSession("backwardRulesKsession");

        ksession.setGlobal("symptomGlobal", "genetika");

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


        return ksession;
    }
}
