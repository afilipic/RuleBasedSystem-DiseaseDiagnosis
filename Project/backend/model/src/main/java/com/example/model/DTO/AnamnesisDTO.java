package com.example.model.DTO;

import com.example.model.enums.Anamnesis;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnamnesisDTO {
    private String patient;
    private List<Anamnesis> symptoms;
}
