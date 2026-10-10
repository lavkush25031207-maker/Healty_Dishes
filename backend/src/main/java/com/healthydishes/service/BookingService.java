package com.healthydishes.service;
import com.healthydishes.dto.*;
import com.healthydishes.entity.TableBooking;
import com.healthydishes.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class BookingService {
 private final BookingRepository repository;
 public BookingService(BookingRepository repository){this.repository=repository;}
 public BookingResponse create(BookingRequest request){
  if(request.bookingDate().isBefore(LocalDate.now())) throw new IllegalArgumentException("Booking date cannot be in the past");
  if("TABLE".equals(request.reservationType())) {
   AvailableTableResponse table=availability(request.bookingDate(),request.bookingTime(),request.guestCount()).stream().filter(item->item.tableNumber()==request.tableNumber()).findFirst().orElseThrow(()->new IllegalArgumentException("Selected table cannot accommodate this party"));
   if(!table.available()) throw new IllegalArgumentException("Selected table is no longer available");
  } else if(request.roomCategory()==null||request.roomCategory().isBlank()) throw new IllegalArgumentException("Please select a room category");
  TableBooking booking=new TableBooking(); booking.setBookingCode("TB-"+UUID.randomUUID().toString().substring(0,8).toUpperCase()); booking.setCustomerName(request.customerName()); booking.setPhone(request.phone()); booking.setEmail(request.email()); booking.setBookingDate(request.bookingDate()); booking.setBookingTime(request.bookingTime()); booking.setGuestCount(request.guestCount()); booking.setTableNumber(request.tableNumber()); booking.setReservationType(request.reservationType()); booking.setRoomCategory(request.roomCategory()); booking.setBookingPrice(request.bookingPrice()); booking.setSpecialRequest(request.specialRequest()); if("HALL".equals(request.reservationType())) booking.setStatus(com.healthydishes.entity.BookingStatus.INQUIRY_PENDING);
  return response(repository.save(booking));
 }
 public List<AvailableTableResponse> availability(LocalDate date,LocalTime time,int guests){
  Set<Integer> reserved=repository.findAllByBookingDateAndBookingTime(date,time).stream().filter(item->item.getStatus()!=com.healthydishes.entity.BookingStatus.CANCELLED).map(TableBooking::getTableNumber).collect(java.util.stream.Collectors.toSet());
  int[] capacities={2,2,2,4,4,4,4,6,6,8,8,10};
  return java.util.stream.IntStream.range(0,capacities.length).filter(index->capacities[index]>=guests).mapToObj(index->new AvailableTableResponse(index+1,capacities[index],capacities[index]==2?"Couple":capacities[index]<=6?"Family":"General Dining",!reserved.contains(index+1))).toList();
 }
 private BookingResponse response(TableBooking b){return new BookingResponse(b.getId(),b.getBookingCode(),b.getCustomerName(),b.getPhone(),b.getEmail(),b.getBookingDate(),b.getBookingTime(),b.getGuestCount(),b.getTableNumber(),b.getReservationType(),b.getRoomCategory(),b.getBookingPrice(),b.getSpecialRequest(),b.getStatus());}
}
