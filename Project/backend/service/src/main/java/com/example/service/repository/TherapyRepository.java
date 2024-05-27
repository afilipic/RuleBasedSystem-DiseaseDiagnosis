package com.example.service.repository;

import com.example.model.Patient;
import com.example.model.Therapy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TherapyRepository extends JpaRepository<Therapy, Integer> {
    Optional<Therapy> findById(Integer id);
}
