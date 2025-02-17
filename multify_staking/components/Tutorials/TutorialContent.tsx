import { PopoverContentProps, useTour } from "@reactour/tour";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FC } from "react";
import { useUserData } from "../../context/userDataHook";
import { db } from "../../firebase";

export interface TutorialContentProps extends PopoverContentProps {
  title: string;
  description: string;
}

const TutorialContent: FC<TutorialContentProps> = ({
  title,
  description,
  currentStep,
  setCurrentStep,
  setIsOpen,
}) => {
  const { steps } = useTour();
  const { userData, updateUserData } = useUserData();

  const updateIsNew = async () => {
    const qry = query(
      collection(db, "users"),
      where("uid", "==", userData?.uid)
    );
    const querySnapshot = await getDocs(qry);
    const temp = querySnapshot.docs.map((doc) => {
      // console.log doc ref.id
      return doc.ref.id;
    });
    const ref = doc(db, "users", temp[0]);
    await updateDoc(ref, { isNew: false });
    updateUserData();
  };

  const handleNext = () => {
    if (currentStep + 1 === steps.length) {
      setIsOpen(false);
      updateIsNew();
      return;
    } else if (currentStep + 1 < steps.length) {
      setCurrentStep((step) => step + 1);
    }
  };

  return (
    <div>
      <div className="text-lg font-medium mb-[16px]">{title}</div>
      <div className="text-base opacity-60 mb-[14px]">{description}</div>

      <div className="flex justify-between">
        <div className="text-xs">
          {currentStep + 1}/{steps.length}
        </div>
        <div
          className="text-xs underline uppercase cursor-pointer"
          onClick={handleNext}
        >
          {currentStep + 1 === steps.length ? "finish onboarding" : "next"}
        </div>
      </div>
    </div>
  );
};

export default TutorialContent;