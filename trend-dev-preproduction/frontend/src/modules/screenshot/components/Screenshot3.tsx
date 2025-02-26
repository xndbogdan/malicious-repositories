import React, { FC } from "react";
import styles from "../ScreenshotPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";

const Screenshot3: FC = ({ setScreenshot, language }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.text}>{localized.screenshot3}</div>
        <div className={styles.button}>
          <Button
            secondary
            onClick={() => {
              setScreenshot(4);
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
            language === "ru" ? "Screen3ru.png" : "Screen3.png"
          })`,
        }}
      />
    </div>
  );
};

export default Screenshot3;
