package com.rutgers.degnav.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

    @Column(name = "net_id", unique = true, nullable = false)
    private String netId;

    @Column(nullable = false)
    private String password;

    private String seniority;
    private String major;
    private String school;

    @Column(name = "courses_completed", columnDefinition = "json")
    private String coursesCompleted;

    @Column(name = "credits_completed", nullable = false)
    private int creditsCompleted;

    @Column(name = "major_requirements_fulfilled", columnDefinition = "json")
    private String majorRequirementsFulfilled;

    @Column(name = "department_requirements_fulfilled", columnDefinition = "json")
    private String departmentRequirementsFulfilled;

    @Column(name = "graduation_year", nullable = false)
    private int graduationYear;

    @Column(precision = 3, scale = 2)
    private BigDecimal gpa;
}