package com.example.model;

import com.example.model.enums.Anamnesis;
import com.example.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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
    @ManyToMany()
    private Set<Disease> possibleDiseases;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @CollectionTable(name = "anamneses",
            joinColumns = @JoinColumn(name = "patient_id"))
    @Column(name = "anamnesis")
    private List<Anamnesis> anamneses;


    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<Diagnosis> diagnoses;

    public Patient() {
        this.setRole(Role.PATIENT);
    }

    public void addPossibleDisease(Disease disease){
        possibleDiseases.add(disease);
    }

    public void removePossibleDisease(Disease disease){
        possibleDiseases.remove(disease);
    }

    public void addDiagnosis(Diagnosis diagnosis){
        diagnoses.add(diagnosis);
    }


    public Patient(Integer id, String username, String firstname, String lastname, String telephoneNumber, String password, Role role, boolean isActive, LocalDate birthDate, String gender, Double height, Double weight, String bloodType, List<BloodTestAnalysis> bloodTestAnalyses, Set<Disease> possibleDiseases, List<Anamnesis> anamneses, List<Diagnosis> diagnoses) {
        super(id, username, firstname, lastname, telephoneNumber, password, role, isActive);
        this.birthDate = birthDate;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.bloodType = bloodType;
        this.bloodTestAnalyses = bloodTestAnalyses;
        this.possibleDiseases = possibleDiseases;
        this.anamneses = anamneses;
        this.diagnoses = diagnoses;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); // Simplify to use only the unique ID
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