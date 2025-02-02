package com.rutgers.degnav.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rutgers.degnav.models.User;
import com.rutgers.degnav.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{netId}")
    public ResponseEntity<?> getUserByNetId(@PathVariable String netId) {
        Optional<User> user = userService.getUserByNetId(netId);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{netId}/courses")
    public ResponseEntity<?> getCoursesForUser(@PathVariable String netId) {
        List<String> coursesWithNames = userService.getCoursesForUser(netId);
        return ResponseEntity.ok(coursesWithNames);
    }
}
