package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.dto.SectionDTO;
import za.co.quick.read.obomvu.model.*;
import za.co.quick.read.obomvu.repository.*;
import za.co.quick.read.obomvu.services.GenerateBookSections;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")
public class GameStateController {
	@Autowired
	private GameStateRepository gameStateRepository;

	@PostMapping(value = "/gameState/update")
	public ResponseEntity<GameState> updateGameState(@Valid @RequestBody GameState gameState) {
		try {
			Optional<GameState> savedGameState = gameStateRepository.findById(gameState.getId());
			if(savedGameState == null){
				@Valid GameState save = gameStateRepository.save(gameState);
				return ResponseEntity.ok(save);
			} else {
				gameState.setId(savedGameState.get().getId());
				@Valid GameState save = gameStateRepository.save(gameState);
				return ResponseEntity.ok(save);
			}
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

}
