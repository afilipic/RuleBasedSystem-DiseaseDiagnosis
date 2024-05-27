package com.example.model.DTO;

import com.example.model.BloodTestAnalysis;
import com.example.model.Diagnosis;
import com.example.model.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private String username;
    private String firstname;
    private String lastname;
    private String telephoneNumber;
    private LocalDate birthDate;
    private String gender;
    private Double height;
    private Double weight;
    private String bloodType;
    private List<BloodTestAnalysis> bloodTestAnalyses;
    private List<Diagnosis> diagnoses;



    public PatientDTO(Patient patient) {
        this.username = patient.getUsername();
        this.firstname = patient.getFirstname();
        this.lastname = patient.getLastname();
        this.telephoneNumber = patient.getTelephoneNumber();
        this.birthDate = patient.getBirthDate();
        this.gender = patient.getGender();
        this.height = patient.getHeight();
        this.weight = patient.getWeight();
        this.bloodType = patient.getBloodType();
        this.bloodTestAnalyses = patient.getBloodTestAnalyses();
        this.diagnoses = patient.getDiagnoses();
    }

}
