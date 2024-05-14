package com.example.service.repository;

import com.example.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Integer> {

    public List<Disease> findAll();
}
