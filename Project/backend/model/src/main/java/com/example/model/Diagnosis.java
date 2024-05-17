package com.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    @Getter
    @ManyToOne
    private Disease disease;

    @ManyToOne
    private User doctor;

}
