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

    public static final int SECTION_LENGTH = 2000;
    private List<Opponent> opponents;

    public GenerateBookSections() {
    }

    public List<BookSection> generateSections(Book book){
        this.opponents = opponentRepository.findAll();
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
            bookSection.setContent(buildContent(startIndex,endIndex, content));
            bookSection.setBook_id(book.getId());
            bookSection.setStatus(BookStatus.Status.UN_READ.toString());
            bookSection.setSection_index(index);
            bookSection.setStatus_picture("sectionIcon.png");
            booksSectionList.add(bookSection);
            startIndex = endIndex;
            index++;
        }
        return booksSectionList;
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

    private String buildContent(int startIndex, int endIndex, String[] content) {
        StringBuilder stringBuilder = new StringBuilder();
        for(int index = startIndex; index < endIndex; index++){
            stringBuilder.append(content[index]);
            stringBuilder.append(" ");
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
