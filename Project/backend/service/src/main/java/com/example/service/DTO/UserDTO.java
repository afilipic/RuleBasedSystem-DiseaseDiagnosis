package com.example.service.DTO;

import com.example.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
