package com.example.model.DTO;

import com.example.model.User;
import com.example.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User2DTO {
    private String username;
    private String firstname;
    private String lastname;
    private String telephoneNumber;
    private Role role;

    public User2DTO(User user) {
        this.username = user.getUsername();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.telephoneNumber = user.getTelephoneNumber();
        this.role = user.getRole();
    }
}
