package com.company.attendance.repository;

import com.company.attendance.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByBatch_Students_Id(Long studentId);

    List<Session> findByTrainer_Id(Long trainerId);
}