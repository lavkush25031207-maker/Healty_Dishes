package com.healthydishes.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name="order_items")
public class OrderItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id",nullable=false) @JsonIgnore private CustomerOrder order;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="menu_item_id",nullable=false) private MenuItem menuItem;
 private int quantity;
 @Column(precision=10,scale=2) private BigDecimal unitPrice;
 @Column(precision=10,scale=2) private BigDecimal lineTotal;
 public Long getId(){return id;} public MenuItem getMenuItem(){return menuItem;} public int getQuantity(){return quantity;} public BigDecimal getUnitPrice(){return unitPrice;} public BigDecimal getLineTotal(){return lineTotal;}
 public void setOrder(CustomerOrder v){order=v;} public void setMenuItem(MenuItem v){menuItem=v;} public void setQuantity(int v){quantity=v;} public void setUnitPrice(BigDecimal v){unitPrice=v;} public void setLineTotal(BigDecimal v){lineTotal=v;}
}
