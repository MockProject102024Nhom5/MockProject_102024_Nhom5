package com.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.model.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Integer> {

}
