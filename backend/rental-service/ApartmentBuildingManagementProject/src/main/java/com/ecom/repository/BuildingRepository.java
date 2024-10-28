package com.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.model.Building;

public interface BuildingRepository extends JpaRepository<Building, Integer> {

}
