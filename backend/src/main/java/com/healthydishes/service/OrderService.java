package com.healthydishes.service;
import com.healthydishes.dto.*;
import com.healthydishes.entity.*;
import com.healthydishes.exception.ResourceNotFoundException;
import com.healthydishes.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class OrderService {
 private final OrderRepository orders; private final MenuItemRepository menuItems; private final BookingRepository bookings;
 public OrderService(OrderRepository orders,MenuItemRepository menuItems,BookingRepository bookings){this.orders=orders;this.menuItems=menuItems;this.bookings=bookings;}
 @Transactional public OrderResponse create(OrderRequest request){
  if(request.orderType()==OrderType.DELIVERY&&(request.deliveryAddress()==null||request.deliveryAddress().isBlank())) throw new IllegalArgumentException("Delivery address is required");
  TableBooking tableBooking=null;
  if(request.orderType()==OrderType.DINE_IN){
   if(request.tableBookingCode()==null||request.tableBookingCode().isBlank()) throw new IllegalArgumentException("Table booking ID is required for dine-in orders");
   tableBooking=bookings.findByBookingCodeIgnoreCase(request.tableBookingCode().trim()).orElseThrow(()->new IllegalArgumentException("Invalid table booking ID"));
   if(!"TABLE".equals(tableBooking.getReservationType())||tableBooking.getStatus()==BookingStatus.CANCELLED) throw new IllegalArgumentException("This booking ID is not valid for table ordering");
  }
  CustomerOrder order=new CustomerOrder(); order.setOrderNumber("HD-"+LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)+"-"+UUID.randomUUID().toString().substring(0,4).toUpperCase()); order.setCustomerName(request.customerName()); order.setPhone(request.phone()); order.setEmail(request.email()); order.setOrderType(request.orderType()); order.setDeliveryAddress(request.deliveryAddress()); order.setTableNumber(tableBooking==null?null:tableBooking.getTableNumber()); order.setTableBookingCode(tableBooking==null?null:tableBooking.getBookingCode()); order.setPaymentMethod(request.paymentMethod());
  BigDecimal total=BigDecimal.ZERO;
  for(OrderItemRequest requestedItem:request.items()){
   MenuItem menuItem=menuItems.findById(requestedItem.menuItemId()).orElseThrow(()->new ResourceNotFoundException("Menu item not found: "+requestedItem.menuItemId()));
   if(!menuItem.isAvailable()) throw new IllegalArgumentException(menuItem.getName()+" is currently unavailable");
   OrderItem item=new OrderItem(); item.setMenuItem(menuItem); item.setQuantity(requestedItem.quantity()); item.setUnitPrice(menuItem.getPrice()); item.setLineTotal(menuItem.getPrice().multiply(BigDecimal.valueOf(requestedItem.quantity()))); order.addItem(item); total=total.add(item.getLineTotal());
  }
  order.setTotalAmount(total); return response(orders.save(order));
 }
 @Transactional(readOnly=true) public OrderResponse track(String number){return response(orders.findByOrderNumber(number.toUpperCase()).orElseThrow(()->new ResourceNotFoundException("No order found with number "+number)));}
 @Transactional public OrderResponse updateStatus(Long id,OrderStatus status){CustomerOrder order=orders.findById(id).orElseThrow(()->new ResourceNotFoundException("Order not found"));order.setStatus(status);return response(order);}
 private OrderResponse response(CustomerOrder o){return new OrderResponse(o.getId(),o.getOrderNumber(),o.getStatus(),o.getTotalAmount(),o.getCreatedAt());}
}
