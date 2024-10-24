package com.ecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ApartmentBuildingManagementProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApartmentBuildingManagementProjectApplication.class, args);
		// Encode the password and print it
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String rawPassword = "passwordJohn"; // Replace with your raw password
		String encodedPassword = passwordEncoder.encode(rawPassword);
		// Print the encoded password to the console
		System.out.println("Encoded Password: " + encodedPassword);
	}

}
