package com.ecom.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.exception.ConflictException;
import com.ecom.exception.NotFoundException;
import com.ecom.model.ApartmentRental;
import com.ecom.repository.ApartmentRentalRepository;
import com.ecom.service.ApartmentRentalService;

@Service
public class ApartmentRentalServiceImpl implements ApartmentRentalService {

	@Autowired
	private ApartmentRentalRepository apartmentRentalRepository;

	@Override
	public ApartmentRental saveApartmentRental(ApartmentRental apartmentRental) throws Exception {
		Optional<ApartmentRental> existRental = apartmentRentalRepository
				.findByBuildingAndApartmentNumber(apartmentRental.getBuilding(), apartmentRental.getApartmentNumber());
		if (existRental.isPresent()) {
			throw new ConflictException("Apartment already rented.");
		}
		return apartmentRentalRepository.save(apartmentRental);
	}

	@Override
	public ApartmentRental updateApartmentRental(int rentalId, ApartmentRental apartmentRental) {
		ApartmentRental existApartmentRental = apartmentRentalRepository.findById(rentalId)
				.orElseThrow(() -> new NotFoundException("Rental record not found."));
		Optional<ApartmentRental> conflictingRental = apartmentRentalRepository
				.findByBuildingAndApartmentNumber(apartmentRental.getBuilding(), apartmentRental.getApartmentNumber());
		if (conflictingRental.isPresent() && !conflictingRental.get().getRentalId().equals(rentalId)) {
			throw new ConflictException("Apartment already rented in this building.");
		}
		if (apartmentRental.getResident() != null) {
			existApartmentRental.setResident(apartmentRental.getResident());
		}
		if (apartmentRental.getBuilding() != null) {
			existApartmentRental.setBuilding(apartmentRental.getBuilding());
		}
		if (apartmentRental.getApartmentNumber() != null) {
			existApartmentRental.setApartmentNumber(apartmentRental.getApartmentNumber());
		}
		if (apartmentRental.getRentalFee() != null) {
			existApartmentRental.setRentalFee(apartmentRental.getRentalFee());
		}
		if (apartmentRental.getDeflag() != 0) {
			existApartmentRental.setDeflag(apartmentRental.getDeflag());
		}
		if (apartmentRental.getRentalStartDate() != null) {
			existApartmentRental.setRentalStartDate(apartmentRental.getRentalStartDate());
		}
		if (apartmentRental.getRentalEndDate() != null) {
			existApartmentRental.setRentalEndDate(apartmentRental.getRentalEndDate());
		}

		return apartmentRentalRepository.save(existApartmentRental);
	}

	@Override
	public ApartmentRental getApartmentRentalDetails(int rentalId) {
		ApartmentRental apartmentRental = apartmentRentalRepository.findById(rentalId)
				.orElseThrow(() -> new NotFoundException("Rental record not found."));
		return apartmentRental;
	}

	@Override
	public List<ApartmentRental> listAllApartmentRentals(Pageable pageable) {
		return apartmentRentalRepository.findAll(pageable).getContent();
	}

	@Override
	public ApartmentRental deleteApartmentRental(int rentalId) {
		ApartmentRental existingRental = apartmentRentalRepository.findById(rentalId)
				.orElseThrow(() -> new NotFoundException("Rental record not found."));
		existingRental.setDeflag(0);
		return apartmentRentalRepository.save(existingRental);
	}
}
