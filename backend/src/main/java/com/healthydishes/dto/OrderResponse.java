package com.healthydishes.dto;
import com.healthydishes.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record OrderResponse(Long id,String orderNumber,OrderStatus status,BigDecimal totalAmount,LocalDateTime createdAt) {}
