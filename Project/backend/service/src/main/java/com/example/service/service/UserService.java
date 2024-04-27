package com.example.service.service;

import com.example.model.Role;
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
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MailService mailService;


    public User save(User user){return userRepository.save(user);}


    public User createNewPatient(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setTelephoneNumber(userDTO.getTelephoneNumber());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(Role.PATIENT);
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
