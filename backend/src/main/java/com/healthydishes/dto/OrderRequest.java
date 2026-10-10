package com.healthydishes.dto;
import com.healthydishes.entity.OrderType;
import com.healthydishes.entity.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
public record OrderRequest(@NotBlank String customerName,@NotBlank @Pattern(regexp="^[0-9+ -]{10,15}$") String phone,@Email String email,@NotNull OrderType orderType,String deliveryAddress,String tableBookingCode,@NotNull PaymentMethod paymentMethod,@NotEmpty List<@Valid OrderItemRequest> items) {}
