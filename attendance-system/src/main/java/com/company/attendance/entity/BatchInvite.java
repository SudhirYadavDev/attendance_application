package com.company.attendance.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "batch_invites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BatchInvite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne
    private Batch batch;

    @ManyToOne
    private User createdBy;

    private LocalDateTime createdAt;

    private Boolean active;
}