package com.healthydishes.repository;
import com.healthydishes.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface OrderRepository extends JpaRepository<CustomerOrder,Long>{Optional<CustomerOrder> findByOrderNumber(String orderNumber);}
