import { FC } from "react";
import TutorialContent from "../TutorialContent";
import { PopoverContentProps } from "@reactour/tour";

const CustomerTutorialStep4: FC<PopoverContentProps> = (props) => {
  return (
    <TutorialContent
      title="Account"
      description="This is your account, where you can customize your information and overall platform experience."
      {...props}
    />
  );
};

export default CustomerTutorialStep4;