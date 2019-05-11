package za.co.quick.read.obomvu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.quick.read.obomvu.exception.ResourceNotFoundException;
import za.co.quick.read.obomvu.model.Account;
import za.co.quick.read.obomvu.repository.AccountRepository;


@RestController
@RequestMapping("/api/v1")
public class AccountController {
	@Autowired
	private AccountRepository accountRepository;

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

	@PostMapping("/account")
	public Account createAccount(@Valid @RequestBody Account account) {
		return accountRepository.save(account);
	}

	@PutMapping("/account/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable(value = "id") Long accountId,
                                                  @Valid @RequestBody Account accountDetails) throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));

		account.setName(accountDetails.getName());
		account.setAge(accountDetails.getAge());
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
