package com.rutgers.degnav.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_sections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id", nullable = false)
    private Course course;

    @Column(name = "course_section", nullable = false)
    private int courseSection;

    @Column(nullable = false)
    private String professor;

    @Column(nullable = false)
    private String classDay;

    @Column(name = "class_start_time", nullable = false)
    private String classStartTime;

    @Column(name = "class_end_time", nullable = false)
    private String classEndTime;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int capacity;

    @Column(name = "students_signed_up", nullable = false)
    private int studentsSignedUp;
}
