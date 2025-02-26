import localized from "helpers/localized";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export const questsFooter = () => {
  const quest = useSelector((state: RootState) => state.user.user.quest);

  switch (quest) {
    case 1:
      return localized.questFooter1;
    case 2:
      return localized.questFooter2;
    case 3:
      return localized.questFooter3;
    case 4:
      return localized.questFooter4;
    case 5:
      return localized.questFooter5;
    case 6:
      return localized.questFooter6;
    case 7:
      return localized.questFooter7;
    case 8:
      return localized.questFooter8;
    case 9:
      return localized.questFooter9;
    case 10:
      return localized.questFooter10;
    case 11:
      return localized.questFooter11;
    case 12:
      return localized.questFooter12;
    case 13:
      return localized.questFooter13;
    case 14:
      return localized.questFooter14;
    case 15:
      return localized.questFooter15;
    case 16:
      return localized.questFooter16;
    case 17:
      return localized.questFooter17;
    case 18:
      return localized.questFooter18;
    case 19:
      return localized.questFooter19;
    case 20:
      return localized.questFooter20;
    case 21:
      return localized.questFooter21;
    default:
      return "";
  }
};
