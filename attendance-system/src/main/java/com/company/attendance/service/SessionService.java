package com.company.attendance.service;

import com.company.attendance.entity.Session;

import java.util.List;

public interface SessionService {

    Session createSession(Session session, String clerkUserId);

    List<Session> getStudentSessions(String clerkUserId);

    List<Session> getTrainerSessions(String clerkUserId);
}