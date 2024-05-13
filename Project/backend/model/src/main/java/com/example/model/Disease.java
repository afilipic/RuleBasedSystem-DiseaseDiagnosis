package com.example.model;


import com.example.model.enums.BloodTestType;
import com.example.model.enums.Symptoms;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Entity
@Table(name = "diseases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ElementCollection
    @CollectionTable(name = "symptoms",
            joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "symptom")
    private List<Symptoms> symptoms;


    @ElementCollection
    @CollectionTable(name = "blood_tests",
            joinColumns = @JoinColumn(name = "disease_id"))
    @MapKeyEnumerated(EnumType.STRING)
    private Map<BloodTestType, BloodTestCriteria> bloodTests;
}
