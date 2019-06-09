package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.model.*;
import za.co.quick.read.obomvu.repository.*;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")
public class GameStateController {
	@Autowired
	private GameStateRepository gameStateRepository;

	@PostMapping(value = "gameState/get")
	public ResponseEntity<GameState> getGameState(@RequestBody GameState gameState) {
		try {
			if(isGameState(gameState) == null){
				ResponseEntity responseEntity = new ResponseEntity("No game state", HttpStatus.BAD_REQUEST);
				return responseEntity;
			} else {
				GameState gameState1 = isGameState(gameState);
				return ResponseEntity.ok(gameState1);
			}
		} catch (Exception error){
				ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

	@PostMapping(value = "/gameState/update")
	public ResponseEntity<GameState> updateGameState(@Valid @RequestBody GameState gameState) {
		try {
			if(isGameState(gameState) == null){
				@Valid GameState save = gameStateRepository.save(gameState);
				return ResponseEntity.ok(save);
			} else {
				GameState gameState1 = isGameState(gameState);
				return ResponseEntity.ok(gameState1);
			}
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

	private GameState isGameState(GameState gameState) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("day")
				.withIgnorePaths("minute")
				.withIgnorePaths("second");

		Example<GameState> example = Example.of(gameState, ignoringExampleMatcher);
		Optional<GameState> savedGameState = gameStateRepository.findOne(example);
		if(!savedGameState.isPresent()){
			return null;
		}
		return savedGameState.get();
	}

}
