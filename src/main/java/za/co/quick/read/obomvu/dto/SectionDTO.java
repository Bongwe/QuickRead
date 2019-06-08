package za.co.quick.read.obomvu.dto;

import za.co.quick.read.obomvu.model.BookSection;
import za.co.quick.read.obomvu.model.SelectedOpponent;

import java.util.ArrayList;
import java.util.List;

public class SectionDTO {

    List<BookSection> sectionList = new ArrayList<>();
    SelectedOpponent opponent;

    public SectionDTO() {
    }

    public List<BookSection> getSectionList() {
        return sectionList;
    }

    public void setSectionList(List<BookSection> sectionList) {
        this.sectionList = sectionList;
    }

    public SelectedOpponent getOpponent() {
        return opponent;
    }

    public void setOpponent(SelectedOpponent opponent) {
        this.opponent = opponent;
    }

    @Override
    public String toString() {
        return "SectionDTO{" +
                "sectionList=" + sectionList +
                ", opponent=" + opponent +
                '}';
    }
}
