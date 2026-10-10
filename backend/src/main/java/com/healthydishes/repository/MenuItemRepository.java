package com.healthydishes.repository;
import com.healthydishes.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MenuItemRepository extends JpaRepository<MenuItem,Long>{List<MenuItem> findAllByAvailableTrueOrderByCategoryAscNameAsc();}
