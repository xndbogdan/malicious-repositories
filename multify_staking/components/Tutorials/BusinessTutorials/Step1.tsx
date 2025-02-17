import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const BusinessTutorialStep1: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Business HomePage"
      description="On business home page you have overview of your current giveaways all of the winners from past giveaways."
      {...props}
    />
  );
};

export default BusinessTutorialStep1;