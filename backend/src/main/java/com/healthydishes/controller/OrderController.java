package com.healthydishes.controller;
import com.healthydishes.dto.*;
import com.healthydishes.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/orders")
public class OrderController {
 private final OrderService service;
 public OrderController(OrderService service){this.service=service;}
 @PostMapping @Operation(summary="Place delivery, pickup or table order") public ResponseEntity<OrderResponse> create(@Valid @RequestBody OrderRequest request){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));}
 @GetMapping("/track/{orderNumber}") @Operation(summary="Track order using public order number") public OrderResponse track(@PathVariable String orderNumber){return service.track(orderNumber);}
 @PatchMapping("/{id}/status") @Operation(summary="Update kitchen or delivery status") public OrderResponse status(@PathVariable Long id,@Valid @RequestBody StatusUpdateRequest request){return service.updateStatus(id,request.status());}
}
