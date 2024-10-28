package com.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.model.AuthResponse;
import com.ecom.model.AuthenticationRequest;
import com.ecom.service.AuthenticationService;

@RestController
@RequestMapping("/api/apartment-rentals/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authRequest) {
		// Kiểm tra thông tin xác thực không được để trống
		if (authRequest.getEmail() == null || authRequest.getPassword() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password must not be empty");
		}

		try {
			// Xác thực người dùng và nhận token
			String token = authenticationService.authenticate(authRequest);
			return ResponseEntity.ok(new AuthResponse(token));
		} catch (RuntimeException e) {
			// Nếu có lỗi xảy ra, trả về phản hồi UNAUTHORIZED
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
}
