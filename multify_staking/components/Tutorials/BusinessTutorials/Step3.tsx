import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const BusinessTutorialStep3: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Giveaways"
      description="On this page you have a total review of all of your live, ended and giveaway drafts, as well as giveaway statistics."
      {...props}
    />
  );
};

export default BusinessTutorialStep3;