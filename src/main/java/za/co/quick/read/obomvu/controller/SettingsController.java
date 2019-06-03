package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.quick.read.obomvu.model.Settings;
import za.co.quick.read.obomvu.repository.SettingsRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class SettingsController {
    @Autowired
    private SettingsRepository settingsRepository;

    @PostMapping(value = "/settings/set")
    public ResponseEntity<Settings> setSettings(@Valid @RequestBody Settings settings) {
        try {
            @Valid Settings save = settingsRepository.save(settings);
            return ResponseEntity.ok(save);
        } catch (Exception error){
            ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }
}
