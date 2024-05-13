package com.example.model;

import com.example.model.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "patients")
@Data
public class Patient extends User{

    @OneToMany(mappedBy = "patient")
    private List<BloodTestAnalysis> bloodTestAnalyses;

    @OneToMany(mappedBy = "patient")
    private List<Diagnosis> diagnoses;

    public Patient() {
        this.setRole(Role.PATIENT);
    }
}
