package com.company.attendance.repository;

import com.company.attendance.entity.BatchInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BatchInviteRepository extends JpaRepository<BatchInvite, Long> {
    Optional<BatchInvite> findByToken(String token);
}