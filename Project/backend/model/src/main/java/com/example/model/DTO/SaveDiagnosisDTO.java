package com.example.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveDiagnosisDTO {
    private String patient;
    private String diagnosisName;
}
