package com.healthydishes.dto;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;

public record BookingRequest(
 @NotBlank String customerName,
 @NotBlank @Pattern(regexp="^[0-9+ -]{10,15}$") String phone,
 @NotBlank @Email String email,
 @NotNull @FutureOrPresent LocalDate bookingDate,
 @NotNull LocalTime bookingTime,
 @Min(1) @Max(30) int guestCount,
 @Min(0) @Max(12) Integer tableNumber,
 @NotBlank String reservationType,
 String roomCategory,
 @Min(0) int bookingPrice,
 @Size(max=600) String specialRequest) {}
