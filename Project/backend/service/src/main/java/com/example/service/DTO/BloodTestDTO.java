package com.example.service.DTO;

import com.example.model.BloodTestAnalysis;
import com.example.model.enums.Symptoms;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodTestDTO {
    private String patient;
    private List<Symptoms> symptoms;
    private List<BloodTestAnalysis> tests;
}
