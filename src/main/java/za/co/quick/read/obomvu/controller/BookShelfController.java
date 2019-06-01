package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.model.BookShelf;
import za.co.quick.read.obomvu.repository.BookRepository;
import za.co.quick.read.obomvu.repository.BookSectionRepository;
import za.co.quick.read.obomvu.repository.BookShelfRepository;
import za.co.quick.read.obomvu.services.GenerateBookSections;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")
public class BookShelfController {
	@Autowired
	private BookShelfRepository bookShelfRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private BookSectionRepository bookSectionRepository;
	@Autowired
	private GenerateBookSections generateBookSections;

	@GetMapping("/bookshelfs")
	public List<BookShelf> getAllBooks() {
		List<BookShelf> bookShelfs = bookShelfRepository.findAll();
		/*ArrayList booksDto = new ArrayList();
		for (BookShelf book: books) {
			booksDto.add(createBookDTO(book));
		}*/
		return bookShelfs;
	}

	@GetMapping("/bookshelf/{id}")
	public ResponseEntity<List<Book>> getBooksInBookShelf(@PathVariable(value = "id") Long accountId) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");
		try {
			BookShelf bookShelf = new BookShelf();
			bookShelf.setAccount_id(accountId);
			Example<BookShelf> example = Example.of(bookShelf, ignoringExampleMatcher);
			List<BookShelf> booksInShelf = bookShelfRepository.findAll(example);

			List<Book> bookList = new ArrayList<>();
			for(BookShelf bookInShelf: booksInShelf){
				Optional<Book> bookOptional = bookRepository.findById(bookInShelf.getBook_id());
				if(bookOptional.isPresent()){
					bookList.add(bookOptional.get());
				}
			}
			return ResponseEntity.ok(bookList);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
			return responseEntity;
		}
	}

	@GetMapping("/bookshelf/read/{id}")
	public ResponseEntity<List<BookSection>> readBook(@PathVariable(value = "id") Long bookId) {
		try {
			if (!getBooksSections(bookId).isEmpty()) {
				return ResponseEntity.ok(getBooksSections(bookId));
			}
			Optional<Book> bookOptional = bookRepository.findById(bookId);
			List<BookSection> bookSections = generateBookSections.generateSections(bookOptional.get());
			List<BookSection> bookSections1 = bookSectionRepository.saveAll(bookSections);
			return ResponseEntity.ok(bookSections1);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
			return responseEntity;
		}
	}

	@PostMapping(value = "/bookshelf/add")
	public ResponseEntity<BookShelf> createAccount(@Valid @RequestBody BookShelf bookShelf) {
		try {
			if(isBookInShelf(bookShelf) == true){
				return new ResponseEntity("Book already in shelf", HttpStatus.BAD_REQUEST);
			}
			@Valid BookShelf save = bookShelfRepository.save(bookShelf);
			return ResponseEntity.ok(save);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.CONFLICT);
			return responseEntity;
		}
	}

	private boolean isBookInShelf( BookShelf bookShelf) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");

		Example<BookShelf> example = Example.of(bookShelf, ignoringExampleMatcher);
		List<BookShelf> results = bookShelfRepository.findAll(example);
		if(results.isEmpty()){
			return false;
		} else {
			return true;
		}
	}


	private List<BookSection> getBooksSections(Long book_id) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");
		BookSection bookSection = new BookSection();
		bookSection.setBook_id(book_id);

		Example<BookSection> example = Example.of(bookSection, ignoringExampleMatcher);
		return bookSectionRepository.findAll(example);
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
