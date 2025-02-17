import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const BusinessTutorialStep2: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Create your giveaway"
      description="On this page you can select your template and start creating your giveaways."
      {...props}
    />
  );
};

export default BusinessTutorialStep2;