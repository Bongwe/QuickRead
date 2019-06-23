package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.model.Player;
import za.co.quick.read.obomvu.model.SelectedOpponent;
import za.co.quick.read.obomvu.repository.BookSectionRepository;
import za.co.quick.read.obomvu.repository.PlayerRepository;
import za.co.quick.read.obomvu.repository.SelectedOpponentRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class BookSectionController {
    @Autowired
    private BookSectionRepository bookSectionRepository;
    @Autowired
    private SelectedOpponentRepository selectedOpponentRepository;
    @Autowired
    private PlayerRepository playerRepository;

    @PostMapping(value = "/section/update")
    public ResponseEntity<BookSection> createAccount(@Valid @RequestBody BookSection bookSection) {
        try {
            @Valid BookSection save = bookSectionRepository.save(bookSection);
            return ResponseEntity.ok(save);
        } catch (Exception error){
            ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
            return responseEntity;
        }
    }

    @PostMapping(value = "/section/opponent")
    public ResponseEntity<SelectedOpponent> updateOpponent(@Valid @RequestBody SelectedOpponent opponent) {
        try {
            @Valid SelectedOpponent save = selectedOpponentRepository.save(opponent);
            return ResponseEntity.ok(save);
        } catch (Exception error){
            ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
            return responseEntity;
        }
    }

    @PostMapping(value = "/section/player")
    public ResponseEntity<Player> updatePlayer(@Valid @RequestBody Player player) {
        try {
            @Valid Player save = playerRepository.save(player);
            return ResponseEntity.ok(save);
        } catch (Exception error){
            ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
            return responseEntity;
        }
    }
}
