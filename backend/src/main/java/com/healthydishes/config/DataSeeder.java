package com.healthydishes.config;
import com.healthydishes.entity.*;
import com.healthydishes.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {
 @Bean CommandLineRunner seedMenu(MenuItemRepository repository){return args->{if(repository.count()==0) repository.saveAll(List.of(
  dish("Build Your Own Wok","Pick your base, protein, vegetables and signature sauce.","Bowls","349","/images/img.jpg",FoodType.VEG,20),
  dish("Chilli Garlic Noodles","Wok-tossed noodles with crunchy vegetables and roasted garlic.","Noodles","279","/images/img2.jpg",FoodType.VEG,18),
  dish("Hot & Sour Soup","A warming broth with mushrooms, tofu and seasonal greens.","Soups","189","/images/img6.jpg",FoodType.VEGAN,12),
  dish("Tofu Gochujang","Crispy tofu glazed in a sweet, spicy Korean chilli sauce.","Mains","329","/images/img3.jpg",FoodType.VEGAN,22),
  dish("Shanghai Chicken Dim Sum","Juicy chicken dumplings served with chilli oil.","Dim Sum","299","/images/img1.jpg",FoodType.NON_VEG,16),
  dish("Thai Basil Chicken","Minced chicken, basil and peppers with jasmine rice.","Mains","369","/images/img5.jpg",FoodType.NON_VEG,24),
  dish("Veg Crystal Dumplings","Translucent dumplings packed with garden vegetables.","Dim Sum","259","/images/img4.jpg",FoodType.VEGAN,15)
  ));};}
 private MenuItem dish(String n,String d,String c,String p,String i,FoodType f,int m){return new MenuItem(n,d,c,new BigDecimal(p),i,f,m);}
}
