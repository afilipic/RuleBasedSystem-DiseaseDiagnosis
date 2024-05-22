package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckPossibleDisease {
    private Integer patientId;
    private Disease possibleDisease;
    private Integer totalTests;
    private Integer correctTests;

    public CheckPossibleDisease(Integer patientId, Disease possibleDisease){
        this.patientId = patientId;
        this.possibleDisease = possibleDisease;
        this.totalTests = possibleDisease.getBloodTests().size();
        this.correctTests = 0;
    }

    public Double evaluate(){
        return  this.correctTests * 100.0 / this.totalTests;
    }
}
