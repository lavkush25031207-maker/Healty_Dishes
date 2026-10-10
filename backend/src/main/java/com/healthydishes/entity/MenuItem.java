package com.healthydishes.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name="menu_items")
public class MenuItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String name;
 @Column(length=600) private String description;
 @Column(nullable=false) private String category;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal price;
 private String imageUrl;
 @Enumerated(EnumType.STRING) private FoodType foodType;
 private boolean available=true;
 private int preparationMinutes;
 public MenuItem(){}
 public MenuItem(String name,String description,String category,BigDecimal price,String imageUrl,FoodType foodType,int preparationMinutes){this.name=name;this.description=description;this.category=category;this.price=price;this.imageUrl=imageUrl;this.foodType=foodType;this.preparationMinutes=preparationMinutes;}
 public Long getId(){return id;} public String getName(){return name;} public String getDescription(){return description;} public String getCategory(){return category;} public BigDecimal getPrice(){return price;} public String getImageUrl(){return imageUrl;} public FoodType getFoodType(){return foodType;} public boolean isAvailable(){return available;} public int getPreparationMinutes(){return preparationMinutes;}
 public void setName(String v){name=v;} public void setDescription(String v){description=v;} public void setCategory(String v){category=v;} public void setPrice(BigDecimal v){price=v;} public void setImageUrl(String v){imageUrl=v;} public void setFoodType(FoodType v){foodType=v;} public void setAvailable(boolean v){available=v;} public void setPreparationMinutes(int v){preparationMinutes=v;}
}
