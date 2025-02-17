import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const CustomerTutorialStep1: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Home"
      description="On home page you have overview of all live giveaways and all of the companies that host them."
      {...props}
    />
  );
};

export default CustomerTutorialStep1;