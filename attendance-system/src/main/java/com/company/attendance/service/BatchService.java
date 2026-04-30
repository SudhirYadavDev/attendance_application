package com.company.attendance.service;

import com.company.attendance.entity.Batch;
import com.company.attendance.entity.BatchInvite;

import java.util.Map;

public interface BatchService {

    Batch createBatch(Batch batch, String clerkUserId);

    Batch addTrainer(Long batchId, Long trainerId);

    Batch addStudent(Long batchId, Long studentId);

    Map<String, Object> getBatchSummary(Long batchId, String clerkUserId);

    Map<String, Object> getProgrammeSummary(String clerkUserId);

    BatchInvite createInvite(Long batchId, String clerkUserId);

    Batch joinBatch(Long batchId, String token, String clerkUserId);

    Map<String, Object> getInstitutionSummary(Long institutionId, String clerkUserId);
}