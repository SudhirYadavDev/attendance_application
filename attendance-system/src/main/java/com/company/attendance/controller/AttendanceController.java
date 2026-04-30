package com.company.attendance.controller;

import com.company.attendance.entity.Attendance;
import com.company.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/mark")
    public Attendance mark(
            @RequestParam Long sessionId,
            @RequestParam String status,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return attendanceService.markAttendance(sessionId, clerkUserId, status);
    }

    @GetMapping("/session/{sessionId}")
    public List<Attendance> getSessionAttendance(
            @PathVariable Long sessionId,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return attendanceService.getSessionAttendance(sessionId, clerkUserId);
    }

    @GetMapping("/sessions/{sessionId}/attendance")
    public List<Attendance> getSessionAttendanceForTrainer(
            @PathVariable Long sessionId,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return attendanceService.getSessionAttendanceForTrainer(sessionId, clerkUserId);
    }

    @GetMapping("/my")
    public List<Attendance> getMyAttendance(
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return attendanceService.getMyAttendance(clerkUserId);
    }
}