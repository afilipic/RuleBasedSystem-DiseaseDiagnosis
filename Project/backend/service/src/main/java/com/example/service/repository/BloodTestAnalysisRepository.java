package com.example.service.repository;

import com.example.model.BloodTestAnalysis;
import com.example.model.Patient;
import com.example.model.enums.BloodTestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface BloodTestAnalysisRepository extends JpaRepository<BloodTestAnalysis, Integer> {
    boolean existsByPatientAndTypeAndDate(Patient patient, BloodTestType type, LocalDate date);

}
