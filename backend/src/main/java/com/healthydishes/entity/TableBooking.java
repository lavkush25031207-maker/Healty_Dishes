package com.healthydishes.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity @Table(name="table_bookings")
public class TableBooking {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private String bookingCode;
 @Column(nullable=false) private String customerName;
 @Column(nullable=false) private String phone;
 @Column(nullable=false) private String email;
 @Column(nullable=false) private LocalDate bookingDate;
 @Column(nullable=false) private LocalTime bookingTime;
 @Column(nullable=false) private int guestCount;
 private Integer tableNumber;
 private String reservationType;
 private String roomCategory;
 private int bookingPrice;
 @Column(length=600) private String specialRequest;
 @Enumerated(EnumType.STRING) private BookingStatus status=BookingStatus.CONFIRMED;
 public Long getId(){return id;} public String getBookingCode(){return bookingCode;} public String getCustomerName(){return customerName;} public String getPhone(){return phone;} public String getEmail(){return email;} public LocalDate getBookingDate(){return bookingDate;} public LocalTime getBookingTime(){return bookingTime;} public int getGuestCount(){return guestCount;} public Integer getTableNumber(){return tableNumber;} public String getReservationType(){return reservationType;} public String getRoomCategory(){return roomCategory;} public int getBookingPrice(){return bookingPrice;} public String getSpecialRequest(){return specialRequest;} public BookingStatus getStatus(){return status;}
 public void setBookingCode(String v){bookingCode=v;} public void setCustomerName(String v){customerName=v;} public void setPhone(String v){phone=v;} public void setEmail(String v){email=v;} public void setBookingDate(LocalDate v){bookingDate=v;} public void setBookingTime(LocalTime v){bookingTime=v;} public void setGuestCount(int v){guestCount=v;} public void setTableNumber(Integer v){tableNumber=v;} public void setReservationType(String v){reservationType=v;} public void setRoomCategory(String v){roomCategory=v;} public void setBookingPrice(int v){bookingPrice=v;} public void setSpecialRequest(String v){specialRequest=v;} public void setStatus(BookingStatus v){status=v;}
}
