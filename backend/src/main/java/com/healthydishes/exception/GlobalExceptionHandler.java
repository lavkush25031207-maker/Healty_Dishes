package com.healthydishes.exception;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
 @ExceptionHandler(ResourceNotFoundException.class)
 ResponseEntity<ApiError> notFound(ResourceNotFoundException exception){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiError(LocalDateTime.now(),404,exception.getMessage(),Map.of()));}
 @ExceptionHandler(IllegalArgumentException.class)
 ResponseEntity<ApiError> invalid(IllegalArgumentException exception){return ResponseEntity.badRequest().body(new ApiError(LocalDateTime.now(),400,exception.getMessage(),Map.of()));}
 @ExceptionHandler(MethodArgumentNotValidException.class)
 ResponseEntity<ApiError> validation(MethodArgumentNotValidException exception){Map<String,String> errors=new LinkedHashMap<>();exception.getBindingResult().getFieldErrors().forEach(error->errors.put(error.getField(),error.getDefaultMessage()));return ResponseEntity.badRequest().body(new ApiError(LocalDateTime.now(),400,"Please check the submitted details",errors));}
}
