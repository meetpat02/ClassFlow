package com.rutgers.degnav.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rutgers.degnav.models.Course;
import com.rutgers.degnav.repositories.CourseRepository;
import com.rutgers.degnav.repositories.UserRepository;
import com.rutgers.degnav.models.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ObjectMapper objectMapper;


    @Autowired
    public UserService(UserRepository userRepository, CourseRepository courseRepository, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.objectMapper = objectMapper;
    }

    public Optional<User> getUserByNetId(String netId) {
        return Optional.ofNullable(userRepository.findByNetId(netId));
    }
    public List<String> getCoursesForUser(String netId) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByNetId(netId));
        
        if (userOptional.isEmpty()) {
            return List.of();
        }

        User user = userOptional.get();

        List<String> courseIds = parseCourseIds(user.getCoursesCompleted());

        return getCoursesWithNames(courseIds);
    }

    private List<String> parseCourseIds(String coursesCompletedJson) {
        try {
            return objectMapper.readValue(coursesCompletedJson, List.class);
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    private List<String> getCoursesWithNames(List<String> courseIds) {
        return courseIds.stream()
                .map(courseId -> {
                    Course course = courseRepository.findByCourseId(courseId);
                    if (course != null) {
                        return course.getCourseId() + " - " + course.getCourseName();
                    } else {
                        return null;
                    }
                })
                .filter(courseDetail -> courseDetail != null)
                .collect(Collectors.toList());
    }
}
