package com.healthydishes.repository;
import com.healthydishes.entity.TableBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
public interface BookingRepository extends JpaRepository<TableBooking,Long>{
 List<TableBooking> findAllByBookingDateAndBookingTime(LocalDate date,LocalTime time);
 Optional<TableBooking> findByBookingCodeIgnoreCase(String bookingCode);
}
