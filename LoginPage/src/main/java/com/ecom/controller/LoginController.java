package com.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public String login(@RequestParam String email, @RequestParam String password) {
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			return "Đăng nhập thành công!";

		} catch (AuthenticationException e) {
			return "Đăng nhập không thành công: " + e.getMessage();
		}
	}
}
