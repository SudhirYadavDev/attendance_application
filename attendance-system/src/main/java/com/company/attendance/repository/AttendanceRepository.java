package com.company.attendance.repository;

import com.company.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findBySessionId(Long sessionId);

    List<Attendance> findBySession_Batch_Id(Long batchId);

    List<Attendance> findByStudent_ClerkUserId(String clerkUserId);
}