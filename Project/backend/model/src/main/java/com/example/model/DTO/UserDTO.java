package com.example.model.DTO;

import com.example.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String firstname;
    private String lastname;
    private String telephoneNumber;
    private String password;
    private Role role;


    // patient
    private LocalDate birthDate;
    private String gender;
    private Double height;
    private Double weight;
    private String bloodType;
}
