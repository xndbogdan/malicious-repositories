import React, { FC } from "react";
import styles from "./NewsPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { setGamePage } from "../game/store/GameSlice";

const NewsPage: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.title}> {localized.news}</div>
          <div className={styles.new}>
            <div className={styles.titleDate}>
              <div className={styles.titleNew}> {localized.obt}</div>
              <div className={styles.date}>13.01.2024</div>
            </div>
            <div className={styles.text}>{localized.new1}</div>
          </div>
          <div className={styles.button}>
            <Button
              secondary
              onClick={() => {
                dispatch(setGamePage(""));
              }}
            >
              {localized.close}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/NewsPage.png)` }}
      />
    </div>
  );
};

export default NewsPage;
