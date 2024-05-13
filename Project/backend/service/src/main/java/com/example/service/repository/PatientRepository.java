package com.example.service.repository;

import com.example.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Optional<Patient> findOneByUsername(String username);

    Optional<Patient> findOneById(Integer id);

}
