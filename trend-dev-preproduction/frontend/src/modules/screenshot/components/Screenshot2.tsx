import React, { FC } from "react";
import styles from "../ScreenshotPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";

const Screenshot2: FC = ({ setScreenshot, language }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.text}>{localized.screenshot2}</div>
        <div className={styles.button}>
          <Button
            secondary
            onClick={() => {
              setScreenshot(3);
            }}
          >
            {localized.next}
          </Button>
        </div>
      </div>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(/assets/screenshots/${
            language === "ru" ? "Screen2ru.png" : "Screen2.png"
          })`,
        }}
      />
    </div>
  );
};

export default Screenshot2;
