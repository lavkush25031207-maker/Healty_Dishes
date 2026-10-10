package com.healthydishes.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI restaurantOpenApi() {
        return new OpenAPI().info(new Info().title("Healthy Dishes Restaurant API")
                .description("Menu, ordering, table booking and tracking APIs").version("1.0.0")
                .contact(new Contact().name("Healthy Dishes").email("hello@healthydishes.in")));
    }
}
