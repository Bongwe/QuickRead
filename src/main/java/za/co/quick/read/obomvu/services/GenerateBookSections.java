package za.co.quick.read.obomvu.services;

import org.springframework.stereotype.Component;
import za.co.quick.read.obomvu.model.Book;
import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.utils.BookStatus;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenerateBookSections {

    public static final int SECTION_LENGHT = 2000;

    public GenerateBookSections() {
    }

    public List<BookSection> generateSections(Book book){

        List<BookSection> booksSectionList = new ArrayList<>();
        int startIndex = 0;
        String[] content = book.getContent().split("\\s+");

        for(int endIndex = SECTION_LENGHT; endIndex < content.length; endIndex = endIndex + SECTION_LENGHT){
            BookSection bookSection = new BookSection();
            bookSection.setContent(buildSection(startIndex,endIndex, content));
            bookSection.setBook_id(book.getId());
            bookSection.setStatus(BookStatus.Status.UN_READ.toString());
            booksSectionList.add(bookSection);
            startIndex = endIndex;
        }

        return booksSectionList;
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
