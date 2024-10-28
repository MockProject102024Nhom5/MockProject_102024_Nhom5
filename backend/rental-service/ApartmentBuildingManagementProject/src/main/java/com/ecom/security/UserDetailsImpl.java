package com.ecom.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {
	private final String email;
	private final String password;
	private final Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(String email, String password, Collection<? extends GrantedAuthority> authorities) {
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // Bạn có thể thêm logic để kiểm tra trạng thái tài khoản
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // Kiểm tra xem tài khoản có bị khóa không
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // Kiểm tra xem thông tin đăng nhập có hết hạn không
	}

	@Override
	public boolean isEnabled() {
		return true; // Kiểm tra xem tài khoản có được kích hoạt không
	}
}
