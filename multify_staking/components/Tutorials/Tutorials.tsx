import { StepType } from "@reactour/tour";
import BusinessTutorialStep1 from "./BusinessTutorials/Step1";
import BusinessTutorialStep2 from "./BusinessTutorials/Step2";
import BusinessTutorialStep3 from "./BusinessTutorials/Step3";
import BusinessTutorialStep4 from "./BusinessTutorials/Step4";
import BusinessTutorialStep5 from "./BusinessTutorials/Step5";
import BusinessTutorialStep6 from "./BusinessTutorials/Step6";
import CustomerTutorialStep1 from "./UserTutorials/Step1";
import CustomerTutorialStep2 from "./UserTutorials/Step2";
import CustomerTutorialStep3 from "./UserTutorials/Step3";
import CustomerTutorialStep4 from "./UserTutorials/Step4";
import CustomerTutorialStep5 from "./UserTutorials/Step5";

export const businessTutorial: StepType[] = [
  {
    selector: ".business-step1",
    content: BusinessTutorialStep1,
    position: "right",
  },
  {
    selector: ".business-step2",
    content: BusinessTutorialStep2,
    position: "right",
  },
  {
    selector: ".business-step3",
    content: BusinessTutorialStep3,
    position: "right",
  },
  {
    selector: ".business-step4",
    content: BusinessTutorialStep4,
    position: "right",
  },
  {
    selector: ".business-step5",
    content: BusinessTutorialStep5,
    position: "right",
  },
  {
    selector: ".business-step6",
    content: BusinessTutorialStep6,
    position: "right",
  },
];

export const customerTutorialWithGiveaway: StepType[] = [
  {
    selector: ".customer-step1",
    content: CustomerTutorialStep1,
    position: "right",
  },
  {
    selector: ".customer-step2",
    content: CustomerTutorialStep2,
    position: "right",
  },
  {
    selector: ".customer-step3",
    content: CustomerTutorialStep3,
    position: "right",
  },
  {
    selector: ".customer-step4",
    content: CustomerTutorialStep4,
    position: "right",
  },
  {
    selector: ".customer-step5",
    content: CustomerTutorialStep5,
    position: "right",
  },
];

export const customerTutorialWithoutGiveaway: StepType[] = [
  {
    selector: ".customer-step1",
    content: CustomerTutorialStep1,
    position: "right",
  },
  {
    selector: ".customer-step2",
    content: CustomerTutorialStep2,
    position: "right",
  },
  {
    selector: ".customer-step3",
    content: CustomerTutorialStep3,
    position: "right",
  },
  {
    selector: ".customer-step4",
    content: CustomerTutorialStep4,
    position: "right",
  },
];