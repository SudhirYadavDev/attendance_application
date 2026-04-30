package com.company.attendance.service;

import com.company.attendance.entity.*;
import com.company.attendance.exception.BadRequestException;
import com.company.attendance.exception.ForbiddenException;
import com.company.attendance.exception.ResourceNotFoundException;
import com.company.attendance.repository.AttendanceRepository;
import com.company.attendance.repository.SessionRepository;
import com.company.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    @Override
    public Attendance markAttendance(Long sessionId, String clerkUserId, String status) {

        User student = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new ForbiddenException("Only Student can mark attendance");
        }

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        Batch batch = session.getBatch();

        if (batch.getStudents() == null || !batch.getStudents().contains(student)) {
            throw new ForbiddenException("Student not part of this batch");
        }

        boolean alreadyMarked = attendanceRepository
                .findBySessionId(sessionId)
                .stream()
                .anyMatch(a -> a.getStudent().getId().equals(student.getId()));

        if (alreadyMarked) {
            throw new BadRequestException("Attendance already marked");
        }

        Attendance attendance = Attendance.builder()
                .session(session)
                .student(student)
                .status(status)
                .markedAt(java.time.LocalDateTime.now())
                .build();

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getBySession(Long sessionId) {
        return attendanceRepository.findBySessionId(sessionId);
    }

    @Override
    public List<Attendance> getSessionAttendanceForTrainer(Long sessionId, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TRAINER) {
            throw new ForbiddenException("Only Trainer can view session attendance");
        }

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        if (!session.getTrainer().getId().equals(user.getId())) {
            throw new ForbiddenException("You are not the trainer of this session");
        }

        return attendanceRepository.findBySessionId(sessionId);
    }

    @Override
    public List<Attendance> getSessionAttendance(Long sessionId, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TRAINER) {
            throw new ForbiddenException("Only Trainer can view session attendance");
        }

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        if (!session.getTrainer().getId().equals(user.getId())) {
            throw new ForbiddenException("Not your session");
        }

        return attendanceRepository.findBySessionId(sessionId);
    }

    @Override
    public List<Attendance> getMyAttendance(String clerkUserId) {

        User student = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new ForbiddenException("Only students can view their attendance");
        }

        return attendanceRepository.findByStudent_ClerkUserId(clerkUserId);
    }
}