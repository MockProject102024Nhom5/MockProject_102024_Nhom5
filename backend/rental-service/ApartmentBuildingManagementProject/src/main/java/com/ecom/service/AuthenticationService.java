package com.ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.ecom.model.AuthenticationRequest;
import com.ecom.repository.UserRepository;
import com.ecom.security.JwtTokenProvider;

@Service
public class AuthenticationService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	public String authenticate(AuthenticationRequest authRequest) {
		System.out.println(
				"Authenticating user: " + authRequest.getEmail() + " with password: " + authRequest.getPassword());

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			System.out.println("Authentication successful for user: " + authRequest.getEmail());
			return jwtTokenProvider.generateToken(authentication);
		} catch (AuthenticationException e) {
			System.out.println("Authentication failed: " + e.getMessage());
			throw new RuntimeException("Invalid credentials");
		}
	}
}
