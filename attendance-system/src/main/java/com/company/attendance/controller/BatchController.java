package com.company.attendance.controller;

import com.company.attendance.entity.Batch;
import com.company.attendance.entity.BatchInvite;
import com.company.attendance.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @PostMapping
    public Batch createBatch(
            @RequestBody Batch batch,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.createBatch(batch, clerkUserId);
    }

    @PutMapping("/{batchId}/trainers/{trainerId}")
    public Batch addTrainer(@PathVariable Long batchId, @PathVariable Long trainerId) {
        return batchService.addTrainer(batchId, trainerId);
    }

    @PutMapping("/{batchId}/students/{studentId}")
    public Batch addStudent(@PathVariable Long batchId, @PathVariable Long studentId) {
        return batchService.addStudent(batchId, studentId);
    }

    @GetMapping("/{id}/summary")
    public Map<String, Object> getSummary(
            @PathVariable Long id,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.getBatchSummary(id, clerkUserId);
    }

    @GetMapping("/programme/summary")
    public Map<String, Object> programmeSummary(
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.getProgrammeSummary(clerkUserId);
    }

    @PostMapping("/{batchId}/invite")
    public BatchInvite createInvite(
            @PathVariable Long batchId,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.createInvite(batchId, clerkUserId);
    }

    @PostMapping("/{batchId}/join")
    public Batch joinBatch(
            @PathVariable Long batchId,
            @RequestParam String token,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.joinBatch(batchId, token, clerkUserId);
    }

    @GetMapping("/institutions/{institutionId}/summary")
    public Map<String, Object> getInstitutionSummary(
            @PathVariable Long institutionId,
            @RequestHeader("clerkUserId") String clerkUserId
    ) {
        return batchService.getInstitutionSummary(institutionId, clerkUserId);
    }
}