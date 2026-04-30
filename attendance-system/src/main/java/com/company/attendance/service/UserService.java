package com.company.attendance.service;

import com.company.attendance.entity.User;

import java.util.Optional;

public interface UserService {

    User createUser(User user);

    Optional<User> getByClerkId(String clerkUserId);
}