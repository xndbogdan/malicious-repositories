import React, { FC } from "react";
import styles from "../ScreenshotPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { setPopup } from "modules/main/store/MainSlice";

const Screenshot4: FC = ({ language }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.text}>{localized.screenshot4}</div>
        <div className={styles.button}>
          <Button
            secondary
            onClick={() => {
              dispatch(setPopup(""));
            }}
          >
            {localized.play}
          </Button>
        </div>
      </div>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(/assets/screenshots/${
            language === "ru" ? "Screen4ru.png" : "Screen4.png"
          })`,
        }}
      />
    </div>
  );
};

export default Screenshot4;
