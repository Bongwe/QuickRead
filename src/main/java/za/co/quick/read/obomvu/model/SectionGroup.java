package za.co.quick.read.obomvu.model;

import java.util.List;

public class SectionGroup {

    List<BookSection> bookSections;
    SelectedOpponent selectedOpponent;

    public SectionGroup() {
    }

    public List<BookSection> getBookSections() {
        return bookSections;
    }

    public void setBookSections(List<BookSection> bookSections) {
        this.bookSections = bookSections;
    }

    public SelectedOpponent getSelectedOpponent() {
        return selectedOpponent;
    }

    public void setSelectedOpponent(SelectedOpponent selectedOpponent) {
        this.selectedOpponent = selectedOpponent;
    }

    @Override
    public String toString() {
        return "SectionGroup{" +
                "bookSections=" + bookSections +
                ", selectedOpponent=" + selectedOpponent +
                '}';
    }
}
