package com.healthydishes.controller;
import com.healthydishes.dto.*;
import com.healthydishes.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController @RequestMapping("/api/bookings")
public class BookingController {
 private final BookingService service;
 public BookingController(BookingService service){this.service=service;}
 @PostMapping @Operation(summary="Reserve a restaurant table") public ResponseEntity<BookingResponse> create(@Valid @RequestBody BookingRequest request){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));}
 @GetMapping("/available-tables") @Operation(summary="Find tables available for a date, time and party size") public List<AvailableTableResponse> available(@RequestParam LocalDate date,@RequestParam LocalTime time,@RequestParam int guests){return service.availability(date,time,guests);}
}
