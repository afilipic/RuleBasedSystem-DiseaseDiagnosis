package com.example.model;

import com.example.model.enums.BloodTestType;
import com.example.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "patients")
@Data
public class Patient extends User{


    @Column
    private LocalDate birthDate;
    @Column
    private String gender;
    @Column
    private Double height;
    @Column
    private Double weight;
    @Column
    private String bloodType;

    @OneToMany(mappedBy = "patient", fetch = FetchType.EAGER)
    private List<BloodTestAnalysis> bloodTestAnalyses;

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<Diagnosis> diagnoses;

    public Patient() {
        this.setRole(Role.PATIENT);
    }

    public void addBloodTestAnalysis(BloodTestType type){
        boolean exists = this.bloodTestAnalyses.stream()
                .anyMatch(bloodTestAnalysis -> bloodTestAnalysis.getType() == type && bloodTestAnalysis.getDate().equals(LocalDate.now()));

        // Ako ne postoji, dodajemo novi BloodTestAnalysis
        if (!exists) {
            BloodTestAnalysis bloodTestAnalysis = new BloodTestAnalysis(type, this);
            this.bloodTestAnalyses.add(bloodTestAnalysis);
        }
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + getId() +
                ", birthDate=" + birthDate +
                ", gender='" + gender + '\'' +
                ", height=" + height +
                ", weight=" + weight +
                ", bloodType='" + bloodType + '\'' +
                '}';
    }
}
