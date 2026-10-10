package com.healthydishes.controller;
import com.healthydishes.entity.MenuItem;
import com.healthydishes.repository.MenuItemRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/menu-items")
public class MenuController {
 private final MenuItemRepository repository;
 public MenuController(MenuItemRepository repository){this.repository=repository;}
 @GetMapping @Operation(summary="Get all currently available dishes") public List<MenuItem> all(){return repository.findAllByAvailableTrueOrderByCategoryAscNameAsc();}
 @PostMapping @Operation(summary="Create a menu dish") public MenuItem create(@RequestBody MenuItem item){return repository.save(item);}
 @PatchMapping("/{id}/availability") @Operation(summary="Change dish availability") public MenuItem availability(@PathVariable Long id,@RequestParam boolean available){MenuItem item=repository.findById(id).orElseThrow();item.setAvailable(available);return repository.save(item);}
}
