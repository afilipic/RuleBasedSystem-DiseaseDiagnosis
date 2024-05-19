package com.example.service.repository;

import com.example.model.Diagnosis;
import com.example.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {
}
