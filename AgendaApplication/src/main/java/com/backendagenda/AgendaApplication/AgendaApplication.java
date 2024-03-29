package com.backendagenda.AgendaApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AgendaApplication{

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(AgendaApplication.class, args);
	}

}
