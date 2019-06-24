package za.co.quick.read.obomvu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.quick.read.obomvu.dto.BookDTO;
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
public class BookShelfController {
	@Autowired
	private BookShelfRepository bookShelfRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private BookSectionRepository bookSectionRepository;
	@Autowired
	private GenerateBookSections generateBookSections;
	@Autowired
	private SelectedOpponentRepository selectedOpponentRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private PlayerRepository playerRepository;

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
	public ResponseEntity<List<BookDTO>> getBooksInBookShelf(@PathVariable(value = "id") Long accountId) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");
		try {
			BookShelf bookShelf = new BookShelf();
			bookShelf.setAccount_id(accountId);
			Example<BookShelf> example = Example.of(bookShelf, ignoringExampleMatcher);
			List<BookShelf> booksInShelf = bookShelfRepository.findAll(example);

			List<BookDTO> bookList = new ArrayList<>();
			for(BookShelf bookInShelf: booksInShelf){
				Optional<Book> bookOptional = bookRepository.findById(bookInShelf.getBook_id());
				if(bookOptional.isPresent()){

					bookList.add(createBookDTO(bookOptional.get()));
				}
			}
			return ResponseEntity.ok(bookList);
		} catch (Exception error){
			ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
			return responseEntity;
		}
	}

	private BookDTO createBookDTO (Book book) {
		BookDTO bookDTO = new BookDTO();
		bookDTO.setId(book.getId());
		bookDTO.setAuthor(book.getAuthor());
		bookDTO.setTitle(book.getTitle());
		bookDTO.setBook_section_id(book.getBook_section_id());
		bookDTO.setComplete_percent(book.getComplete_percent());
		bookDTO.setSynopses(book.getSynopses());
		bookDTO.setPlayer_id(book.getPlayer_id());
		bookDTO.setShortSynopses(book.getSynopses().substring(0,140));
		return bookDTO;
	}

	@GetMapping("/bookshelf/read/{bookId}/{accountId}")
	public ResponseEntity<List<SectionDTO>> readBook(@PathVariable(value = "bookId") Long bookId, @PathVariable(value = "accountId") Long accountId) {
		try {
			if (!getBooksSections(bookId, accountId).isEmpty()) {
				List<BookSection> booksSections = getBooksSections(bookId, accountId);

				List<Player> players = getSelectedPlayers(bookId, accountId);
				List<SelectedOpponent> selectedOpponentList = getSelectedOpponents(bookId, accountId);

				List<SectionDTO> sectionDTOList = generateBookSections.generateSectionGroups(booksSections, selectedOpponentList, players);

				return ResponseEntity.ok(sectionDTOList);
			}
			//Account
			Optional<Account> accountOpt = accountRepository.findById(accountId);

			//Book
			Optional<Book> bookOptional = bookRepository.findById(bookId);

			//Sections
			List<BookSection> bookSections = generateBookSections.generateSections(bookOptional.get(), accountId);

			//Player
			List<Player> players = generateBookSections.generatePlayers(bookSections, accountOpt.get());
			List<Player> savedPlayers = playerRepository.saveAll(players);

			//Opponent
			List<SelectedOpponent> selectedOpponents = generateBookSections.generateOpponents(bookSections, accountId);
			List<SelectedOpponent> savedSelectedOpponents = selectedOpponentRepository.saveAll(selectedOpponents);

			//Opponent and player
			List<BookSection> updatedBookSections = generateBookSections.updateSectionsWithOpponentIds(bookSections, savedSelectedOpponents, savedPlayers);

			//Sections
			List<BookSection> savedBookSections = bookSectionRepository.saveAll(updatedBookSections);
			List<SectionDTO> sectionDTOList = generateBookSections.generateSectionGroups(savedBookSections, savedSelectedOpponents, savedPlayers);

			return ResponseEntity.ok(sectionDTOList);
		} catch (Exception error){
				ResponseEntity responseEntity = new ResponseEntity(error.getMessage(), HttpStatus.BAD_REQUEST);
			return responseEntity;
		}
	}

	@PostMapping(value = "/bookshelf/add")
	public ResponseEntity<BookShelf> addBookToShelf(@Valid @RequestBody BookShelf bookShelf) {
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

	private List<BookSection> getBooksSections(Long book_id, Long accountId) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");

		BookSection bookSection = new BookSection();
		bookSection.setBook_id(book_id);
		bookSection.setAccount_id(accountId);

		Example<BookSection> example = Example.of(bookSection, ignoringExampleMatcher);
		return bookSectionRepository.findAll(example);
	}

	private List<SelectedOpponent> getSelectedOpponents(Long bookId, Long accountId) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");

		SelectedOpponent selectedOpponent = new SelectedOpponent();
		selectedOpponent.setBook_id(bookId);
		selectedOpponent.setAccount_id(accountId);

		Example<SelectedOpponent> example = Example.of(selectedOpponent, ignoringExampleMatcher);
		return selectedOpponentRepository.findAll(example);

	}

	private List<Player> getSelectedPlayers(Long bookId, Long accountId) {
		ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withMatcher("account_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withIgnorePaths("id");

		Player player = new Player();
		player.setBook_id(bookId);
		player.setAccount_id(accountId);

		Example<Player> example = Example.of(player, ignoringExampleMatcher);
		return playerRepository.findAll(example);
	}

	/*private List<SectionDTO> generateSectionDTO(List<BookSection> allSections) {
		List<SectionDTO> sectionDTOList = new ArrayList<>();

		ExampleMatcher ignoringMatcherOpponent = ExampleMatcher.matchingAll()
				.withMatcher("book_id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase())
				.withMatcher("id", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase());

		SelectedOpponent selectedOpponent = new SelectedOpponent();
		Example<SelectedOpponent> opponentExample = Example.of(selectedOpponent, ignoringMatcherOpponent);
		List<SelectedOpponent> allOpponents = selectedOpponentRepository.findAll(opponentExample);

		for(BookSection section  : allSections) {
			SectionDTO newSectionDTO = new SectionDTO();
			SelectedOpponent selectedOpponent1 = allOpponents.get(section.getOpponent_id().intValue());
			newSectionDTO.setSection(section);
			newSectionDTO.setOpponent(selectedOpponent1);
			sectionDTOList.add(newSectionDTO);
		}

		return sectionDTOList;
	}*/

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
