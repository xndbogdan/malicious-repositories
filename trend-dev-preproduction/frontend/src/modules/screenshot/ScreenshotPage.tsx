import React, { FC, useState } from "react";
import styles from "./ScreenshotPage.module.scss";
import Screenshot1 from "./components/Screenshot1";
import Screenshot2 from "./components/Screenshot2";
import Screenshot3 from "./components/Screenshot3";
import Screenshot4 from "./components/Screenshot4";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ScreenshotPage: FC = () => {
  const [screenshot, setScreenshot] = useState(1);

  const language = useSelector((state: RootState) => state.main.language);

  return (
    <div className={styles.popup}>
      <SwitchTransition mode="out-in">
        <CSSTransition key={screenshot} timeout={600} classNames="fade">
          {screenshot === 1 ? (
            <Screenshot1 setScreenshot={setScreenshot} language={language} />
          ) : screenshot === 2 ? (
            <Screenshot2 setScreenshot={setScreenshot} language={language} />
          ) : screenshot === 3 ? (
            <Screenshot3 setScreenshot={setScreenshot} language={language} />
          ) : screenshot === 4 ? (
            <Screenshot4 language={language} />
          ) : (
            <div />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default ScreenshotPage;
