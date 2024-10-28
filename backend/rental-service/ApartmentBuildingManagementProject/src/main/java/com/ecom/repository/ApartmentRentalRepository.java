package com.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.model.ApartmentRental;
import com.ecom.model.Building;

public interface ApartmentRentalRepository extends JpaRepository<ApartmentRental, Integer> {

	public Optional<ApartmentRental> findByBuildingAndApartmentNumber(Building building, String apartmentNumber);
}
