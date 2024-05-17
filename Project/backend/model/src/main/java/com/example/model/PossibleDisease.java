package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PossibleDisease {
    private Integer patientId;
    private Disease possibleDisease;
    private boolean hasDisease;
    private boolean requireTests;
    private Integer requiredTests;

    public PossibleDisease(Integer patientId, Disease disease){
        this.patientId = patientId;
        this.possibleDisease = disease;
        this.hasDisease = false;
        this.requireTests = false;
        this.requiredTests = 0;
    }

}
