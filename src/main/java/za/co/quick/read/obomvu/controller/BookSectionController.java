package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.repository.BookSectionRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class BookSectionController {
    @Autowired
    private BookSectionRepository bookSectionRepository;

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
}
