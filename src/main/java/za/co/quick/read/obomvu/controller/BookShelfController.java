package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.dto.BookDTO;
import za.co.quick.read.obomvu.exception.ResourceNotFoundException;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.model.BookShelf;
import za.co.quick.read.obomvu.repository.BookShelfRepository;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class BookShelfController {
	@Autowired
	private BookShelfRepository bookShelfRepository;

	@GetMapping("/bookshelfs")
	public List<BookShelf> getAllBooks() {
		List<BookShelf> bookShelfs = bookShelfRepository.findAll();
		/*ArrayList booksDto = new ArrayList();
		for (BookShelf book: books) {
			booksDto.add(createBookDTO(book));
		}*/
		return bookShelfs;
	}

	@PostMapping(value = "/bookshelf/add")
	public ResponseEntity<BookShelf> createAccount(@Valid @RequestBody BookShelf account) {
		try {
			@Valid BookShelf save = bookShelfRepository.save(account);
			return ResponseEntity.ok(save);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

	/*@GetMapping("/book/{id}")
	public ResponseEntity<BookDTO> getAccountById(@PathVariable(value = "id") Long bookId)
			throws ResourceNotFoundException {
		Book book = bookRepository.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found for this id : " + bookId));
		BookDTO bookDTO = createBookDTO(book);
		return ResponseEntity.ok().body(bookDTO);
	}*/


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
