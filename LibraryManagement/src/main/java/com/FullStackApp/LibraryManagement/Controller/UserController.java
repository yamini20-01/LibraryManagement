package com.FullStackApp.LibraryManagement.Controller;

import com.FullStackApp.LibraryManagement.Entity.User;
import com.FullStackApp.LibraryManagement.Repository.UserRepository;
import com.FullStackApp.LibraryManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User existingUserByUsername = userRepository.findByUsername(user.getUsername());
        User existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserByUsername != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (existingUserByEmail != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        return ResponseEntity.ok("Login successful");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        User userToDelete = userRepository.findById(id).orElse(null);
        if (userToDelete == null) {
            return ResponseEntity.notFound().build();
        }
        userRepository.delete(userToDelete);
        return ResponseEntity.ok("User deleted successfully");
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countUsers() {
        long userCount = userRepository.count();
        return ResponseEntity.ok(userCount);
    }

}
