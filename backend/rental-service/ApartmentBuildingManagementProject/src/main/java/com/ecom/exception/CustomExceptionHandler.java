	package com.ecom.exception;
	
	import java.util.Map;
	
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.ControllerAdvice;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.ResponseStatus;
	import org.springframework.web.context.request.WebRequest;
	import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
	
	//Exception Handler
	@ControllerAdvice
	public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
	
		@ExceptionHandler(NotFoundException.class)
	    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex, WebRequest request) {
	        return new ResponseEntity<>(Map.of("error", "Not Found", "message", ex.getMessage()), HttpStatus.NOT_FOUND);
	    }

	    @ExceptionHandler(ConflictException.class)
	    public ResponseEntity<Object> handleConflictException(ConflictException ex, WebRequest request) {
	        return new ResponseEntity<>(Map.of("error", "Conflict", "message", ex.getMessage()), HttpStatus.CONFLICT);
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
	        return new ResponseEntity<>(Map.of("error", "Internal Server Error", "message", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
