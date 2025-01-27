package com.winnerezy.Veo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Match single-level paths (e.g., /path)
        registry.addViewController("/{spring:[a-zA-Z0-9]+}").setViewName("forward:/index.html");

        // Match multi-level paths (e.g., /path/another)
        registry.addViewController("/{spring:[a-zA-Z0-9]+}/**").setViewName("forward:/index.html");

        // Handle specific file types that should not forward
        registry.addViewController("/{spring:[a-zA-Z0-9]+}/**")
                .setViewName("forward:/index.html");
    }
}

