package za.co.quick.read.obomvu.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import za.co.quick.read.obomvu.dto.SectionDTO;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.model.Opponent;
import za.co.quick.read.obomvu.model.SelectedOpponent;
import za.co.quick.read.obomvu.repository.OpponentRepository;
import za.co.quick.read.obomvu.repository.SelectedOpponentRepository;
import za.co.quick.read.obomvu.utils.BookStatus;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class GenerateBookSections {

    public static final int SECTIONS_PER_GROUP = 4;
    int opponentCount = 0;

    @Autowired
    private OpponentRepository opponentRepository;

    @Autowired
    private SelectedOpponentRepository selectedOpponentRepository;

    private List<Opponent> opponents;

    public GenerateBookSections() {
    }

    public List<BookSection> generateSections(Book book){
        //the formula we use
        //14 words per line
        //142 words per section
        //14 (words per line) * 142(number number of line) = 1988 (words in total)
        this.opponents = opponentRepository.findAll();
        List<BookSection> booksSectionList = new ArrayList<>();
        Long index = 0L;
        String[] content = book.getContent().split("\\r\\n");
        int strartIndex = 0;

        for(int endIndex = 142; endIndex < content.length ; endIndex = endIndex + 142){
            String sectionContent = buildContent(strartIndex, endIndex, content);
            booksSectionList.add(createBookSection(book, sectionContent ,booksSectionList.size()));
            strartIndex = endIndex;
            if((endIndex + 142) > content.length){
                sectionContent = buildContent(strartIndex, content.length, content);
                booksSectionList.add(createBookSection(book, sectionContent ,booksSectionList.size()));
            }
        }
        return booksSectionList;
    }

    private BookSection createBookSection(Book book, String content,int index) {
        BookSection bookSection = new BookSection();
        bookSection.setContent(content);
        bookSection.setBook_id(book.getId());
        bookSection.setStatus(BookStatus.Status.UN_READ.toString());
        bookSection.setSection_index((long)index);
        bookSection.setStatus_picture("sectionIcon.png");
        return bookSection;
    }

    public List<SelectedOpponent> generateOpponents(List<BookSection> sections) {
        int sectionCount = 0;
        SelectedOpponent newOpponent;
        List<SelectedOpponent> selectedOpponents = new ArrayList<>();

        for(BookSection bookSection: sections){
            if(sectionCount == SECTIONS_PER_GROUP || sectionCount == 0){
                newOpponent = createNewOpponent(bookSection.getBook_id());
                selectedOpponents.add(newOpponent);
                sectionCount = 0;
            }
            sectionCount++;
        }
        return selectedOpponents;
    }

    private SelectedOpponent createNewOpponent(Long book_id) {
        int numberOfOpponents = 7;
        if(opponentCount >= numberOfOpponents)
            opponentCount = 0;
        Opponent randomOpponent = this.opponents.get(opponentCount);
        SelectedOpponent newOpponent = new SelectedOpponent();
        newOpponent.setAvatar(randomOpponent.getAvatar());
        newOpponent.setHealth(randomOpponent.getHealth());
        newOpponent.setName(randomOpponent.getName());
        newOpponent.setPower(randomOpponent.getPower());
        newOpponent.setBook_id(book_id);
        SelectedOpponent save = selectedOpponentRepository.save(newOpponent);
        opponentCount++;

        return save;
    }

    private String buildContent(int strartIndex,int endIndex,String[] content) {
         StringBuilder stringBuilder = new StringBuilder();
        for(int index = strartIndex; index < endIndex; index++){
            stringBuilder.append(content[index]);
            stringBuilder.append("\r");
            stringBuilder.append("\n");
        }
        return stringBuilder.toString();
    }

    public List<SectionDTO> generateSectionGroups(List<BookSection> bookSections, List<SelectedOpponent> selectedOpponents) {
        int sectionCount = 0;
        int opponentCount = 0;
        List<SectionDTO> sectionGroups = new ArrayList<>();
        SectionDTO sectionDTO = new SectionDTO();
        Iterator<BookSection> iterator = bookSections.iterator();
        while(iterator.hasNext()){
            BookSection bookSection = iterator.next();
            if(sectionCount == SECTIONS_PER_GROUP){
                sectionDTO.setOpponent(selectedOpponents.get(opponentCount));
                sectionGroups.add(sectionDTO);
                opponentCount++;
                sectionDTO = new SectionDTO();
                sectionCount = 0;
            }
            if(sectionCount < SECTIONS_PER_GROUP && !iterator.hasNext()){
                sectionDTO.getSectionList().add(bookSection);
                sectionDTO.setOpponent(selectedOpponents.get(opponentCount));
                sectionGroups.add(sectionDTO);
            } else {
                sectionDTO.getSectionList().add(bookSection);
            }
            sectionCount++;
        }
        return sectionGroups;
    }

    public List<BookSection> updateSectionsWithOpponentIds(List<BookSection> bookSections, List<SelectedOpponent> savedSelectedOpponents) {
        int sectionCount = 0;
        int opponentCount = 0;
        SelectedOpponent opponent =  new SelectedOpponent();
        List<BookSection> updatedSections = new ArrayList<>();

        for(BookSection bookSection: bookSections){
            if(sectionCount == SECTIONS_PER_GROUP || sectionCount == 0){
                opponent = savedSelectedOpponents.get(opponentCount);
                opponentCount++;
                sectionCount = 0;
            }
            bookSection.setOpponent_id(opponent.getId());
            updatedSections.add(bookSection);
            sectionCount++;
        }
        return updatedSections;
    }
}
