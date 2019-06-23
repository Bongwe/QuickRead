import {BookSection} from "../BookSection";
import {SelectedOpponent} from "../SelectedOpponent";
import {Player} from "../Player";

export class SectionDTO {
  sectionList: Array<BookSection>;
  opponent: SelectedOpponent;
  player: Player;
}
