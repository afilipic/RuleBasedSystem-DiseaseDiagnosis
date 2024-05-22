package com.example.model;

import com.example.model.enums.BloodTestType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "blood_test_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodTestAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column
    private BloodTestType type;
    @Column
    private Double value;
    @Column
    private String status;
    @Column
    private LocalDate date;

    @JsonIgnore
    public BloodTestAnalysis(BloodTestType type, Patient patient) {
        this.type = type;
        this.patient = patient;
        this.status = "PENDING";
        this.date = LocalDate.now();
        this.value = 0.0;
    }


    @Override
    public String toString() {
        return "BloodTestAnalysis{" +
                "id=" + id +
                ", type=" + type +
                ", value=" + value +
                ", status='" + status + '\'' +
                ", date=" + date +
                '}';
    }
}

