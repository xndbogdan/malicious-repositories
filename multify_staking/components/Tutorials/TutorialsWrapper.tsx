import "@reactour/popover/dist/index.css";
import { TourProvider } from "@reactour/tour";
import { FC, ReactNode } from "react";

export interface TutorialsWrapperProps {
  children: ReactNode;
}

const TutorialsWrapper: FC<TutorialsWrapperProps> = ({ children }) => {
  const opositeSide = {
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
  };

  const makeArrow = (
    position: "right" | "left" | "top" | "bottom" | "custom",
    verticalAlign: "top" | "bottom",
    horizontalAlign: "left" | "right"
  ) => {
    if (!position || position === "custom") {
      return {};
    }

    const width = 16;
    const height = 12;
    const color = "#257D86";
    const isVertical = position === "top" || position === "bottom";
    const spaceFromSide = 10;

    const obj = {
      [`--rtp-arrow-${
        isVertical ? opositeSide[horizontalAlign] : verticalAlign
      }`]: height + spaceFromSide + "px",
      [`--rtp-arrow-${opositeSide[position]}`]: -height + 2 + "px",
      [`--rtp-arrow-border-${isVertical ? "left" : "top"}`]: `${
        width / 2
      }px solid transparent`,
      [`--rtp-arrow-border-${isVertical ? "right" : "bottom"}`]: `${
        width / 2
      }px solid transparent`,
      [`--rtp-arrow-border-${position}`]: `${height}px solid ${color}`,
    };
    return obj;
  };

  return (
    <TourProvider
      steps={[]}
      disableFocusLock
      disableKeyboardNavigation
      disableDotsNavigation
      scrollSmooth
      disableInteraction
      styles={{
        popover: (base, state) => ({
          ...base,
          minWidth: "320px",
          backgroundColor: "#257D86",
          borderRadius: "8px",
          padding: "16px",
          ...makeArrow(
            state?.position,
            state?.verticalAlign,
            state?.horizontalAlign
          ),
        }),
        dot: (base) => ({ ...base, display: "none" }),
        close: (base) => ({ ...base, display: "none" }),
        badge: (base) => ({ ...base, display: "none" }),
        controls: (base) => ({ ...base, display: "none" }),
      }}
    >
      {children}
    </TourProvider>
  );
};

export default TutorialsWrapper;