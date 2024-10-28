package com.ecom.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.model.ApartmentRental;

@Service
public interface ApartmentRentalService {

	public ApartmentRental saveApartmentRental(ApartmentRental apartmentRental) throws Exception;

	public ApartmentRental updateApartmentRental(int rentalId, ApartmentRental apartmentRental);

	public ApartmentRental getApartmentRentalDetails(int rentalId);

	public List<ApartmentRental> listAllApartmentRentals(Pageable pageable);

	public ApartmentRental deleteApartmentRental(int rentalId);

}
