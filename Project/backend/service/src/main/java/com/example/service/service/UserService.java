package com.example.service.service;

import com.example.model.Patient;
import com.example.model.enums.Role;
import com.example.model.User;
import com.example.service.DTO.TokenDTO;
import com.example.service.DTO.UserDTO;
import com.example.service.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRepository patientRepository;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MailService mailService;
    @Autowired
    private ResonerService resonerService;


    public User save(User user){return userRepository.save(user);}

    public void createAdmin() {
        Optional<User> u = userRepository.findOneByUsername("admin");
        if(u.isPresent()){
            return;
        }

        User user = new User();
        user.setUsername("admin");
        user.setFirstname("admin");
        user.setLastname("admin");
        user.setTelephoneNumber("123456789");
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode("Test123!"));
        user.setRole(Role.ADMIN);
        user.setActive(true);
        userRepository.save(user);

        System.out.println("ADMIN USERNAME: " + user.getUsername());
        System.out.println("ADMIN PASSWORD: Test123!");

    }


    public User createNewUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setTelephoneNumber(userDTO.getTelephoneNumber());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        user.setActive(false);
        try {
            user = userRepository.save(user);
            mailService.sendVerificationMail(user.getUsername(), user.getId());
            return user;
        }catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already exists", e);
        }
        catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Verification mail failed",e);
        }

    }

    public Patient createNewPatient(UserDTO userDTO) {
        Patient patient = new Patient();
        patient.setUsername(userDTO.getUsername());
        patient.setFirstname(userDTO.getFirstname());
        patient.setLastname(userDTO.getLastname());
        patient.setTelephoneNumber(userDTO.getTelephoneNumber());
        patient.setBirthDate(userDTO.getBirthDate());
        patient.setGender(userDTO.getGender());
        patient.setBloodType(userDTO.getBloodType());
        patient.setHeight(userDTO.getHeight());
        patient.setWeight(userDTO.getWeight());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        patient.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        patient.setRole(Role.PATIENT);
        patient.setActive(false);
        try {
            patient = patientRepository.save(patient);
            mailService.sendVerificationMail(patient.getUsername(), patient.getId());
            return patient;
        }catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already exists", e);
        }
        catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Verification mail failed",e);
        }

    }


    public void activate(Integer userId)throws RuntimeException{
        User user = userRepository.findOneById(userId).orElse(null);
        user.setActive(true);
        userRepository.save(user);
    }

    public TokenDTO login(String username, String password) throws RuntimeException{
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        User user;
        try {
            Optional<User> u = userRepository.findOneByUsername(username);
            user = u.orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching user data", e);
        }

        if(!user.isActive()){
            throw new RuntimeException("User is not active");
        }

        String jwtToken = jwtService.generateToken(user);
        return new TokenDTO(jwtToken, user.getId(), user.getRole().name());
    }


}
