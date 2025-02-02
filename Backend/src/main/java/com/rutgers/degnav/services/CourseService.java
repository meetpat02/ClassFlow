package com.rutgers.degnav.services;

import com.rutgers.degnav.models.Course;
import com.rutgers.degnav.repositories.CourseRepository;
import com.rutgers.degnav.models.CourseSection;
import com.rutgers.degnav.repositories.CourseSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseSectionRepository courseSectionRepository;

    private final List<String> allDepartments = List.of(
        "013 - African Middle Eastern, and South Asian Languages and Literatures",
        "082 - Art History",
        "098 - Asian Studies",
        "119 - Biological Sciences",
        "160 - Chemistry",
        "190 - Classics",
        "195 - Comparative Literature",
        "198 - Computer Science",
        "220 - Economics",
        "355 - English - Composition and Writing",
        "358 - English - Literature",
        "450 - Geography",
        "640 - Mathematics",
        "730 - Philosophy",
        "750 - Physics",
        "830 - Psychology",
        "840 - Religion",
        "960 - Statistics",
        "988 - Women's, Gender, and Sexuality Studies",
        "189 - Communication and Media Studies",
        "192 - Communication",
        "547 - Information Technologies and Informatics",
        "567 - Journalism and Media Studies",
        "700 - Music",
        "965 - Theater",
        "550 - Landscape Architecture",
        "709 - Nutritional Sciences",
        "776 - Plant Science",
        "010 - Accounting",
        "011 - Administrative Studies",
        "136 - Business Analytics and Information Technology",
        "140 - Business Law",
        "390 - Finance",
        "620 - Management",
        "630 - Marketing",
        "575 - Labor Studies",
        "624 - Management and Work"
    );

    public List<String> getAllDepartments() {
        return allDepartments;
    }
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByDepartment(String departmentId) {
        return courseRepository.findAll().stream()
            .filter(course -> {
                String[] parts = course.getCourseId().split(":");
                return parts.length == 3 && parts[1].equals(departmentId);
            })
            .collect(Collectors.toList());
    }

    public List<CourseSection> getCourseSectionsForDepartment(List<Course> courses) {
        return courses.stream()
                      .flatMap(course -> courseSectionRepository.findByCourse_CourseId(course.getCourseId()).stream())
                      .collect(Collectors.toList());
    }
}
