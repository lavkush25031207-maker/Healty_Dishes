package com.healthydishes.dto;
import com.healthydishes.entity.BookingStatus;
import java.time.LocalDate;
import java.time.LocalTime;
public record BookingResponse(Long id,String bookingCode,String customerName,String phone,String email,LocalDate bookingDate,LocalTime bookingTime,int guestCount,Integer tableNumber,String reservationType,String roomCategory,int bookingPrice,String specialRequest,BookingStatus status) {}
