package com.example.model;

import com.example.model.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;
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

    @OneToMany(mappedBy = "patient")
    private List<BloodTestAnalysis> bloodTestAnalyses;

    @OneToMany(mappedBy = "patient")
    private List<Diagnosis> diagnoses;

    public Patient() {
        this.setRole(Role.PATIENT);
    }
}
