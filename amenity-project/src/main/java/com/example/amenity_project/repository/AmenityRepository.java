package com.example.amenity_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.amenity_project.model.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
}
