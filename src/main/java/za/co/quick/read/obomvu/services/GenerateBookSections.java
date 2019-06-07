package za.co.quick.read.obomvu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.model.Opponent;
import za.co.quick.read.obomvu.model.SelectedOpponent;
import za.co.quick.read.obomvu.repository.OpponentRepository;
import za.co.quick.read.obomvu.repository.SelectedOpponentRepository;
import za.co.quick.read.obomvu.utils.BookStatus;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenerateBookSections {

    public static final int NUM_OF_OPPONENTS = 8;
    @Autowired
    private OpponentRepository opponentRepository;

    @Autowired
    private SelectedOpponentRepository selectedOpponentRepository;

    public static final int SECTION_LENGTH = 2000;
    private int opponentCount = 0;
    private List<Opponent> opponents = new ArrayList<>();

    public GenerateBookSections() {
        List<Opponent> opponents = opponentRepository.findAll();
        this.opponents = opponents;
    }

    public List<BookSection> generateSections(Book book){

        List<BookSection> booksSectionList = new ArrayList<>();
        int startIndex = 0;
        Long index = 0L;
        String[] content = book.getContent().split("\\s+");
        int sectionLength  = SECTION_LENGTH;
        if(content.length < sectionLength){
            sectionLength = content.length;
        }

        for(int endIndex = sectionLength; endIndex <= content.length; endIndex = endIndex + SECTION_LENGTH){
            BookSection bookSection = new BookSection();
            bookSection.setContent(buildSection(startIndex,endIndex, content));
            bookSection.setBook_id(book.getId());
            bookSection.setStatus(BookStatus.Status.UN_READ.toString());
            bookSection.setSection_index(index);
            bookSection.setStatus_picture("sectionIcon.png");
            bookSection.setOpponent_id(createNewOpponent());
            booksSectionList.add(bookSection);
            startIndex = endIndex;
            index++;
        }

        return booksSectionList;
    }

    private Long createNewOpponent() {
        if(this.opponentCount > NUM_OF_OPPONENTS)
            this.opponentCount = 0;
        Opponent randomOpponent = this.opponents.get(this.opponentCount);
        SelectedOpponent newOpponent = new SelectedOpponent();
        newOpponent.setAvatar(randomOpponent.getAvatar());
        newOpponent.setHealth(randomOpponent.getHealth());
        newOpponent.setName(randomOpponent.getName());
        newOpponent.setPower(randomOpponent.getPower());
        SelectedOpponent save = selectedOpponentRepository.save(newOpponent);
        this.opponentCount++;

        return save.getId();
    }

    private String buildSection(int startIndex, int endIndex, String[] content) {
        StringBuilder stringBuilder = new StringBuilder();
        for(int index = startIndex; index < endIndex; index++){
            stringBuilder.append(content[index]);
            stringBuilder.append(" ");
        }
        return stringBuilder.toString();
    }
}
