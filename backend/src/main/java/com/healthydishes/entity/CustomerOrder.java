package com.healthydishes.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name="customer_orders")
public class CustomerOrder {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private String orderNumber;
 @Column(nullable=false) private String customerName;
 @Column(nullable=false) private String phone;
 private String email;
 @Enumerated(EnumType.STRING) private OrderType orderType;
 @Column(length=800) private String deliveryAddress;
 private Integer tableNumber;
 private String tableBookingCode;
 @Enumerated(EnumType.STRING) private PaymentMethod paymentMethod;
 @Enumerated(EnumType.STRING) private OrderStatus status=OrderStatus.CONFIRMED;
 @Column(precision=10,scale=2) private BigDecimal totalAmount;
 private LocalDateTime createdAt;
 @OneToMany(mappedBy="order",cascade=CascadeType.ALL,orphanRemoval=true) private List<OrderItem> items=new ArrayList<>();
 @PrePersist void beforeInsert(){createdAt=LocalDateTime.now();}
 public void addItem(OrderItem item){items.add(item);item.setOrder(this);}
 public Long getId(){return id;} public String getOrderNumber(){return orderNumber;} public String getCustomerName(){return customerName;} public String getPhone(){return phone;} public String getEmail(){return email;} public OrderType getOrderType(){return orderType;} public String getDeliveryAddress(){return deliveryAddress;} public Integer getTableNumber(){return tableNumber;} public String getTableBookingCode(){return tableBookingCode;} public PaymentMethod getPaymentMethod(){return paymentMethod;} public OrderStatus getStatus(){return status;} public BigDecimal getTotalAmount(){return totalAmount;} public LocalDateTime getCreatedAt(){return createdAt;} public List<OrderItem> getItems(){return items;}
 public void setOrderNumber(String v){orderNumber=v;} public void setCustomerName(String v){customerName=v;} public void setPhone(String v){phone=v;} public void setEmail(String v){email=v;} public void setOrderType(OrderType v){orderType=v;} public void setDeliveryAddress(String v){deliveryAddress=v;} public void setTableNumber(Integer v){tableNumber=v;} public void setTableBookingCode(String v){tableBookingCode=v;} public void setPaymentMethod(PaymentMethod v){paymentMethod=v;} public void setStatus(OrderStatus v){status=v;} public void setTotalAmount(BigDecimal v){totalAmount=v;}
}
