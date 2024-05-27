package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "diagnoses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDate date;

    @ManyToOne()
    private Patient patient;

    @ManyToOne
    private Therapy patientTherapy;

    @Getter
    @ManyToOne
    private Disease disease;


    @ManyToOne
    private User doctor;


    @Override
    public int hashCode() {
        return Objects.hash(id); // Simplify to use only the unique ID
    }
}
