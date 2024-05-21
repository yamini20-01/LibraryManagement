package com.FullStackApp.LibraryManagement.Service;

import com.FullStackApp.LibraryManagement.Entity.User;
import com.FullStackApp.LibraryManagement.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public long countUsers() {
        return userRepository.count();
    }
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}