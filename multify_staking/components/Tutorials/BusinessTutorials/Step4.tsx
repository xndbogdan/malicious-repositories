import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const BusinessTutorialStep4: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Public Business Profile"
      description="On this page you have a total overview of information about the company, followers number and all giveaways."
      {...props}
    />
  );
};

export default BusinessTutorialStep4;