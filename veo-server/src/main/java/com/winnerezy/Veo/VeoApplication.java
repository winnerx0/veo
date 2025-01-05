package com.winnerezy.Veo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.winnerezy.Veo.repositories")
@EntityScan(basePackages = "com.winnerezy.Veo.models")
@EnableWebMvc
public class VeoApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeoApplication.class, args);
	}

}
