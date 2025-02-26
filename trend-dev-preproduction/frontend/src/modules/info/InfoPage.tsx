import React, { FC } from "react";
import styles from "./InfoPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { setGamePage } from "modules/game/store/GameSlice";

const InfoPage: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.rows}>
          <div className={styles.title}>{localized.howExp}</div>
          <div className={styles.row}>
            <p className={styles.left}>{"1 " + localized.hit.toLowerCase()}</p>
            <p className={styles.right}>1 exp</p>
          </div>
          <div className={styles.title}>{localized.whatExp}</div>
          <div className={styles.row}>
            <p className={styles.left}>100 exp</p>
            <p className={styles.right}>= 10 hp</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>100 exp</p>
            <p className={styles.right}>
              {"= 10 " + localized.damage.toLowerCase()}
            </p>
          </div>
          <div className={styles.title}>{localized.lvls}</div>
          <div className={styles.row}>
            <p className={styles.left}>1 lvl</p>
            <p className={styles.right}>0 exp</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>2 lvl</p>
            <p className={styles.right}>1000 exp</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>3 lvl</p>
            <p className={styles.right}>2000 exp</p>
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
        style={{ backgroundImage: `url(/assets/pages/InfoPage.png)` }}
      />
    </div>
  );
};

export default InfoPage;
