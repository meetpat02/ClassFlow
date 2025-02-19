package com.rutgers.degnav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.rutgers.degnav.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByNetId(String netId);
}