package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.exception.ResourceNotFoundException;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.repository.BookRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class BookController {
	@Autowired
	private BookRepository bookRepository;

	@GetMapping("/books")
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	@GetMapping("/book/{id}")
	public ResponseEntity<Book> getAccountById(@PathVariable(value = "id") Long bookId)
			throws ResourceNotFoundException {
		Book book = bookRepository.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found for this id : " + bookId));
		return ResponseEntity.ok().body(book);
	}

	/*@PostMapping("/account")
	public Account createAccount(@Valid @RequestBody Account account) {
		return bookRepository.save(account);
	}

	@PutMapping("/account/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable(value = "id") Long accountId,
                                                  @Valid @RequestBody Account accountDetails) throws ResourceNotFoundException {
		Account account = bookRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));

		account.setName(accountDetails.getName());
		account.setUsername(accountDetails.getUsername());
		account.setEmail(accountDetails.getEmail());
		account.setPassword(accountDetails.getPassword());
		account.setInterests(accountDetails.getInterests());

		final Account updatedAccount = bookRepository.save(account);
		return ResponseEntity.ok(updatedAccount);
	}

	@DeleteMapping("/account/{id}")
	public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
			throws ResourceNotFoundException {
		Account account = bookRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id : " + accountId));

		bookRepository.delete(account);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}*/
}
