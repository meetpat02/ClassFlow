package com.rutgers.degnav.controllers;

import com.rutgers.degnav.models.Course;
import com.rutgers.degnav.models.CourseSection;
import com.rutgers.degnav.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/departments")
    public List<String> getAllDepartments() {
        return courseService.getAllDepartments();
    }

    @GetMapping("/{departmentId}")
    public List<Course> getCoursesByDepartment(@PathVariable String departmentId) {
        return courseService.getCoursesByDepartment(departmentId);
    }

    @GetMapping("/{departmentId}/sections")
    public List<CourseSection> getCourseSections(@PathVariable String departmentId) {
        List<Course> courses = courseService.getCoursesByDepartment(departmentId);

        return courseService.getCourseSectionsForDepartment(courses);
    }
}
