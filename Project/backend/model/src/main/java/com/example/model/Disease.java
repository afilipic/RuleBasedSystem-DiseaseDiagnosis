package com.example.model;


import com.example.model.enums.BloodTestType;
import com.example.model.enums.Symptoms;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.HashMap;
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
    @Column
    private String name;
    @Column
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @CollectionTable(name = "symptoms",
            joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "symptom")
    private List<Symptoms> symptoms;


    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @CollectionTable(name = "blood_tests",
            joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "bloodTests")
    private List<BloodTestType> bloodTests;


    public Disease(String name, String description){
        this.name = name;
        this.description = description;
        this.symptoms = new ArrayList<>();
        this.bloodTests = new ArrayList<>();
    }
}
