import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const CustomerTutorialStep3: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Live Competitions"
      description="On this page you have a total overview of all of the giveaways that are live, upcoming, featured or ended."
      {...props}
    />
  );
};

export default CustomerTutorialStep3;