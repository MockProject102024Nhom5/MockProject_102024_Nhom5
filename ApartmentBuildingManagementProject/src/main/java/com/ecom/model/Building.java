package com.ecom.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Building {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int buildingId;

	private int constructionYear;

	private int numberOfFloors;

	private int numberOfApartments;

	private String amenities;

	private int deflag;

}
