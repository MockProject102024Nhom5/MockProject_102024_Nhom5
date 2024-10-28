package com.ecom.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.model.ApartmentRental;
import com.ecom.service.ApartmentRentalService;

@RestController
@RequestMapping("/api/apartment-rentals")
public class RentalController {

	@Autowired
	private ApartmentRentalService apartmentRentalService;

	@PostMapping("/create")
	public ResponseEntity<?> createApartmentRental(@RequestBody ApartmentRental apartmentRental) throws Exception {
		ApartmentRental saveApartmentRental = apartmentRentalService.saveApartmentRental(apartmentRental);
		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("rentalId", saveApartmentRental.getRentalId(),
				"message", "Apartment rental record created successfully.", "rentalDetails", saveApartmentRental));
	}

	@PutMapping("/{rentalId}/update")
	public ResponseEntity<?> updateApartmentRental(@PathVariable int rentalId,
			@RequestBody ApartmentRental apartmentRental) {
		ApartmentRental updatedRental = apartmentRentalService.updateApartmentRental(rentalId, apartmentRental);
		return ResponseEntity.ok(Map.of("rentalId", updatedRental.getRentalId(), "message",
				"Apartment rental record updated successfully.", "updatedRentalDetails", updatedRental));
	}

	@GetMapping("/{rentalId}")
	public ResponseEntity<?> getApartmentRentalDetails(@PathVariable int rentalId) {
		ApartmentRental rentalDetails = apartmentRentalService.getApartmentRentalDetails(rentalId);
		return ResponseEntity.ok(Map.of("rentalId", rentalDetails.getRentalId(), "message",
				"Rental record retrieved successfully.", "rentalDetails", rentalDetails));
	}

	@GetMapping
	public ResponseEntity<?> listAllApartmentRentals(@RequestParam Optional<Integer> page,
			@RequestParam Optional<Integer> limit) {
		Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(10));
		List<ApartmentRental> rentals = apartmentRentalService.listAllApartmentRentals(pageable);
		return ResponseEntity.ok(Map.of("data", rentals, "meta",
				Map.of("page", page.orElse(0), "limit", limit.orElse(10), "total", rentals.size()), "message",
				"Apartment rental records retrieved successfully."));
	}

	@PatchMapping("/{rentalId}/delete")
	public ResponseEntity<?> softDeleteApartmentRental(@PathVariable int rentalId) {
		ApartmentRental deletedRental = apartmentRentalService.deleteApartmentRental(rentalId);
		return ResponseEntity.ok(Map.of("rentalId", deletedRental.getRentalId(), "message",
				"Apartment rental record soft deleted successfully.", "updatedRentalDetails", deletedRental));
	}

}
