package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "therapy")
@Data
public class Therapy    {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    @Column(name = "drug_name")
    private String drugName;

    @Column(name = "drug_dose")
    private Double drugDose;
}
