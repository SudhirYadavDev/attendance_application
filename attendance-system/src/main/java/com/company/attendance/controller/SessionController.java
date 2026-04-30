package com.company.attendance.controller;

import com.company.attendance.entity.Session;
import com.company.attendance.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping
    public Session createSession(
            @RequestBody Session session,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return sessionService.createSession(session, clerkUserId);
    }

    @GetMapping("/student")
    public List<Session> getStudentSessions(
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return sessionService.getStudentSessions(clerkUserId);
    }

    @GetMapping("/trainer")
    public List<Session> getTrainerSessions(
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return sessionService.getTrainerSessions(clerkUserId);
    }
}