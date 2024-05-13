package com.example.model;

import com.example.model.enums.BloodTestType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "blood_test_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodTestAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Patient patient;

    private BloodTestType type;
    private Double value;
    private String status;
    private LocalDate date;

    public BloodTestAnalysis(BloodTestType type, Patient patient) {
        this.type = type;
        this.patient = patient;
        this.status = "PENDING";
        this.date = LocalDate.now();
    }
}

