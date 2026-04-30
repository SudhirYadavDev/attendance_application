package com.company.attendance.controller;

import com.company.attendance.entity.User;
import com.company.attendance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{clerkId}")
    public User getUser(@PathVariable String clerkId) {
        return userService.getByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}