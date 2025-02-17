import { PopoverContentProps } from "@reactour/tour";
import { FC } from "react";
import TutorialContent from "../TutorialContent";

const CustomerTutorialStep2: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Entered competitions"
      description="On this page you have a total overview of all of the giveaways that you entered that are still live or are ended."
      {...props}
    />
  );
};

export default CustomerTutorialStep2;