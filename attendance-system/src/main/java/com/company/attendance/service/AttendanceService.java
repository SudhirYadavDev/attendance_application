package com.company.attendance.service;

import com.company.attendance.entity.Attendance;

import java.util.List;

public interface AttendanceService {

    Attendance markAttendance(Long sessionId, String clerkUserId, String status);

    List<Attendance> getBySession(Long sessionId);

    List<Attendance> getSessionAttendanceForTrainer(Long sessionId, String clerkUserId);

    List<Attendance> getSessionAttendance(Long sessionId, String clerkUserId);

    List<Attendance> getMyAttendance(String clerkUserId);
}