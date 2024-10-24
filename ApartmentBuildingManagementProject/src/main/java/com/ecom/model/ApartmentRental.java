package com.ecom.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApartmentRental {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer rentalId;

	@ManyToOne
	@JoinColumn(name = "residentId")
	private Resident resident;

	@ManyToOne
	@JoinColumn(name = "buildingId")
	private Building building;

	private String apartmentNumber;

	private LocalDate rentalStartDate;

	private LocalDate rentalEndDate;

	private BigDecimal rentalFee;

	private int deflag;

}
