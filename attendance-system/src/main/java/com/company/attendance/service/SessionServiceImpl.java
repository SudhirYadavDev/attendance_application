package com.company.attendance.service;

import com.company.attendance.entity.Batch;
import com.company.attendance.entity.Role;
import com.company.attendance.entity.Session;
import com.company.attendance.entity.User;
import com.company.attendance.exception.ForbiddenException;
import com.company.attendance.exception.ResourceNotFoundException;
import com.company.attendance.repository.BatchRepository;
import com.company.attendance.repository.SessionRepository;
import com.company.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final BatchRepository batchRepository;

    @Override
    public Session createSession(Session session, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TRAINER) {
            throw new ForbiddenException("Only Trainer can create session");
        }

        Batch batch = batchRepository.findById(session.getBatch().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));

        if (batch.getTrainers() == null || !batch.getTrainers().contains(user)) {
            throw new ForbiddenException("Trainer not assigned to this batch");
        }

        session.setTrainer(user);
        session.setBatch(batch);
        session.setCreatedAt(java.time.LocalDateTime.now());

        return sessionRepository.save(session);
    }

    @Override
    public List<Session> getStudentSessions(String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.STUDENT) {
            throw new ForbiddenException("Only Student can view sessions");
        }

        return sessionRepository.findByBatch_Students_Id(user.getId());
    }

    @Override
    public List<Session> getTrainerSessions(String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TRAINER) {
            throw new ForbiddenException("Only Trainer can view sessions");
        }

        return sessionRepository.findByTrainer_Id(user.getId());
    }
}