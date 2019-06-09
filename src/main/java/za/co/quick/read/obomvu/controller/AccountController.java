package za.co.quick.read.obomvu.controller;

import java.util.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.quick.read.obomvu.dto.AccountDTO;
import za.co.quick.read.obomvu.exception.ResourceNotFoundException;
import za.co.quick.read.obomvu.model.Account;
import za.co.quick.read.obomvu.model.Settings;
import za.co.quick.read.obomvu.repository.AccountRepository;
import za.co.quick.read.obomvu.repository.SettingsRepository;


@RestController
@RequestMapping("/api/v1")
public class AccountController {
	public static final long MIN_READ_TIME = 1;
	public static final String READ_EVERY = "DAY";
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private SettingsRepository settingsRepository;

	@GetMapping("/accounts")
	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	@GetMapping("/account/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") Long accountId)
			throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
		return ResponseEntity.ok().body(account);
	}

	@PostMapping(value = "/account")
	public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody Account account) {
		try {
			Settings settings = new Settings();
			AccountDTO accountDTO = new AccountDTO();

			account.setHealth(100);

			@Valid Account savedAccount = accountRepository.save(account);
			settings.setAccount_id(savedAccount.getId());

			settings.setMin_read_time(MIN_READ_TIME);
			settings.setRead_every(READ_EVERY);
			Settings savedSettings = settingsRepository.save(settings);

			accountDTO.setAccount(savedAccount);
			accountDTO.setSettings(savedSettings);
			return ResponseEntity.ok(accountDTO);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

	@PostMapping(value = "/login")
	public ResponseEntity<AccountDTO> accountLogin(@Valid @RequestBody Account account) {
		try {
			ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
					.withMatcher("email", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
					.withMatcher("password", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
					.withIgnorePaths("id")
					.withIgnorePaths("health");

			ExampleMatcher ignoringSettingsMatcher = ExampleMatcher.matchingAll()
					.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
					.withIgnorePaths("id");

			Example<Account> example = Example.of(account, ignoringExampleMatcher);
			Optional<Account> response = accountRepository.findOne(example);

			Settings settings = new Settings();
			settings.setAccount_id(response.get().getId());
			Example<Settings> settingsExample = Example.of(settings, ignoringSettingsMatcher);
			Optional<Settings> settingsResponse = settingsRepository.findOne(settingsExample);

			AccountDTO accountDTO = new AccountDTO();
			accountDTO.setSettings(settingsResponse.get());
			accountDTO.setAccount(response.get());
			return ResponseEntity.ok(accountDTO);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
			return responseEntity;
		}
	}

	@PostMapping("/account/update")
	public ResponseEntity<Account> updateAccount(@Valid @RequestBody Account accountDetails) throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountDetails.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountDetails.getId()));

		account.setName(accountDetails.getName());
		account.setUsername(accountDetails.getUsername());
		account.setEmail(accountDetails.getEmail());
		account.setPassword(accountDetails.getPassword());
		account.setInterests(accountDetails.getInterests());
		account.setProfile_picture(accountDetails.getProfile_picture());
		account.setHealth(accountDetails.getHealth());

		final Account updatedAccount = accountRepository.save(account);
		return ResponseEntity.ok(updatedAccount);
	}

	@DeleteMapping("/account/{id}")
	public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
			throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id : " + accountId));

		accountRepository.delete(account);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
