package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);

    Optional<User> findOneById(Integer id);

}
