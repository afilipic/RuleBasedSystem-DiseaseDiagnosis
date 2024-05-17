package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvaluationResult {
    private Integer patient;
    private Map<String, Double> evaluation;

    public EvaluationResult(Patient patient) {
        this.patient = patient.id;
        this.evaluation = new HashMap<>();
    }

    public void addDisease(Disease disease, Double value){
        evaluation.put(disease.getName(), value);
    }
}
