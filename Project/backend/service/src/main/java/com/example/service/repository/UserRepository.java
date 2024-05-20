package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.User;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE role <> 'PATIENT'", nativeQuery = true)
    List<User> findAllByRole();
    Optional<User> findOneById(Integer id);

}
