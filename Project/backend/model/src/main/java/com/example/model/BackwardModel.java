package com.example.model;

import com.example.model.enums.BackwardType;
import org.kie.api.definition.type.Position;

public class BackwardModel {

    @Position(0)
    private String symptom;
    @Position(1)
    private String disease;
    @Position(2)
    private BackwardType backwardType;

    public BackwardModel(String symptom, String disease, BackwardType backwardType) {
        this.symptom = symptom;
        this.disease = disease;
        this.backwardType = backwardType;
    }

    public BackwardModel(String symptom, String disease) {
        this.symptom = symptom;
        this.disease = disease;
    }

    public String getSymptom() {
        return symptom;
    }

    public void setSymptom(String symptom) {
        this.symptom = symptom;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public BackwardType getBackwardType() {
        return backwardType;
    }

    public void setBackwardType(BackwardType backwardType) {
        this.backwardType = backwardType;
    }
}
