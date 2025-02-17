import { PopoverContentProps } from "@reactour/tour";
import { FC } from "react";
import TutorialContent from "../TutorialContent";

const CustomerTutorialStep5: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Giveaway"
      description="Here you can look through ll of the avaliable giveaways and entre the ones that suit you best."
      {...props}
    />
  );
};

export default CustomerTutorialStep5;