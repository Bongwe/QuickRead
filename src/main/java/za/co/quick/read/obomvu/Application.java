package za.co.quick.read.obomvu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaAuditing
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				//registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000");
				registry.addMapping("/api/v1/**").allowedOrigins("http://localhost:4200");
				registry.addMapping("/api/v1/**").allowedOrigins("http://obomvu.eastus.cloudapp.azure.com:8009");
			}
		};
	}
}
