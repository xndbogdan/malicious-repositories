import { PopoverContentProps } from "@reactour/tour";
import { FC } from "react";
import TutorialContent from "../TutorialContent";

const BusinessTutorialStep5: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Bussines admin panel"
      description="On this page you have a  total overview of all giveaway statistics devided by categories and filters."
      {...props}
    />
  );
};

export default BusinessTutorialStep5;