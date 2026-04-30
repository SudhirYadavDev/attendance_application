package com.company.attendance.service;

import com.company.attendance.entity.*;
import com.company.attendance.exception.ForbiddenException;
import com.company.attendance.exception.ResourceNotFoundException;
import com.company.attendance.repository.AttendanceRepository;
import com.company.attendance.repository.BatchInviteRepository;
import com.company.attendance.repository.BatchRepository;
import com.company.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {

    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final AttendanceRepository attendanceRepository;
    private final BatchInviteRepository batchInviteRepository;

    @Override
    public Batch createBatch(Batch batch, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!(user.getRole() == Role.TRAINER || user.getRole() == Role.INSTITUTION)) {
            throw new ForbiddenException("Only Trainer or Institution can create batch");
        }

        batch.setCreatedAt(java.time.LocalDateTime.now());
        return batchRepository.save(batch);
    }

    @Override
    public Batch addTrainer(Long batchId, Long trainerId) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));

        User trainer = userRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (batch.getTrainers() == null) {
            batch.setTrainers(new HashSet<>());
        }

        batch.getTrainers().add(trainer);

        return batchRepository.save(batch);
    }

    @Override
    public Batch addStudent(Long batchId, Long studentId) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (batch.getStudents() == null) {
            batch.setStudents(new HashSet<>());
        }

        batch.getStudents().add(student);

        return batchRepository.save(batch);
    }

    @Override
    public Map<String, Object> getBatchSummary(Long batchId, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.INSTITUTION) {
            throw new ForbiddenException("Only Institution can view batch summary");
        }

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));

        if (!batch.getInstitutionId().equals(user.getInstitutionId())) {
            throw new ForbiddenException("Not your batch");
        }

        int totalStudents = batch.getStudents() != null ? batch.getStudents().size() : 0;

        List<Attendance> attendances = attendanceRepository.findBySession_Batch_Id(batchId);

        long present = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("present")).count();
        long absent = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("absent")).count();
        long late = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("late")).count();

        Map<String, Object> result = new HashMap<>();
        result.put("batchId", batchId);
        result.put("totalStudents", totalStudents);
        result.put("present", present);
        result.put("absent", absent);
        result.put("late", late);

        return result;
    }

    @Override
    public Map<String, Object> getProgrammeSummary(String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!(user.getRole() == Role.PROGRAMME_MANAGER ||
                user.getRole() == Role.MONITORING_OFFICER)) {
            throw new ForbiddenException("Not allowed");
        }

        List<Batch> batches = batchRepository.findAll();
        List<Attendance> attendances = attendanceRepository.findAll();

        int totalBatches = batches.size();

        int totalStudents = batches.stream()
                .mapToInt(b -> b.getStudents() != null ? b.getStudents().size() : 0)
                .sum();

        long present = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("present")).count();
        long absent = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("absent")).count();
        long late = attendances.stream().filter(a -> a.getStatus().equalsIgnoreCase("late")).count();

        long totalInstitutions = batches.stream()
                .map(Batch::getInstitutionId)
                .filter(java.util.Objects::nonNull)
                .distinct()
                .count();

        Map<String, Object> result = new HashMap<>();
        result.put("totalInstitutions", totalInstitutions);
        result.put("totalBatches", totalBatches);
        result.put("totalStudents", totalStudents);
        result.put("present", present);
        result.put("absent", absent);
        result.put("late", late);

        return result;
    }

    @Override
    public BatchInvite createInvite(Long batchId, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));

        if (!(user.getRole() == Role.TRAINER || user.getRole() == Role.INSTITUTION)) {
            throw new ForbiddenException("Not allowed");
        }

        if (user.getRole() == Role.TRAINER &&
                (batch.getTrainers() == null || !batch.getTrainers().contains(user))) {
            throw new ForbiddenException("Trainer not assigned to this batch");
        }

        BatchInvite invite = BatchInvite.builder()
                .token(java.util.UUID.randomUUID().toString())
                .batch(batch)
                .createdBy(user)
                .createdAt(java.time.LocalDateTime.now())
                .active(true)
                .build();

        return batchInviteRepository.save(invite);
    }

    @Override
    public Batch joinBatch(Long batchId, String token, String clerkUserId) {

        User student = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new ForbiddenException("Only students can join");
        }

        BatchInvite invite = batchInviteRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid invite token"));

        if (!invite.getBatch().getId().equals(batchId)) {
            throw new ForbiddenException("Invalid batch for this token");
        }

        Batch batch = invite.getBatch();

        if (batch.getStudents() == null) {
            batch.setStudents(new java.util.HashSet<>());
        }

        batch.getStudents().add(student);

        return batchRepository.save(batch);
    }

    @Override
    public Map<String, Object> getInstitutionSummary(Long institutionId, String clerkUserId) {

        User user = userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.PROGRAMME_MANAGER) {
            throw new ForbiddenException("Only Programme Manager can view institution summary");
        }

        List<Batch> batches = batchRepository.findAll()
                .stream()
                .filter(b -> institutionId.equals(b.getInstitutionId()))
                .toList();

        List<Attendance> attendances = attendanceRepository.findAll()
                .stream()
                .filter(a -> a.getSession().getBatch().getInstitutionId().equals(institutionId))
                .toList();

        int totalBatches = batches.size();

        int totalStudents = batches.stream()
                .mapToInt(b -> b.getStudents() != null ? b.getStudents().size() : 0)
                .sum();

        long present = attendances.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase("present"))
                .count();

        long absent = attendances.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase("absent"))
                .count();

        long late = attendances.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase("late"))
                .count();

        Map<String, Object> result = new HashMap<>();
        result.put("institutionId", institutionId);
        result.put("totalBatches", totalBatches);
        result.put("totalStudents", totalStudents);
        result.put("present", present);
        result.put("absent", absent);
        result.put("late", late);

        return result;
    }
}