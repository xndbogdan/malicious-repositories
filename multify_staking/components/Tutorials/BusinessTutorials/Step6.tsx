import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const BusinessTutorialStep6: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Start creating giveaways"
      description="You can select any of the pre-made giveaway templates or you can custom create your own giveaway."
      {...props}
    />
  );
};

export default BusinessTutorialStep6;