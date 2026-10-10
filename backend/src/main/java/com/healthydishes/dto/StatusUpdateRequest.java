package com.healthydishes.dto;

import com.healthydishes.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(@NotNull OrderStatus status) {
}
