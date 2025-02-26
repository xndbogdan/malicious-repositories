import React, { FC } from "react";
import styles from "./DevelopmentPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { setGamePage } from "modules/game/store/GameSlice";

const DevelopmentPage: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.rows}>
          <div className={styles.title}>{localized.developmentTitle1}</div>
          <div className={styles.row}>{localized.developmentNow1}</div>
          <div className={styles.row}>{localized.developmentNow2}</div>
          <div className={styles.row}>{localized.developmentNow3}</div>
          <div className={styles.row}>{localized.developmentNow4}</div>
          <div className={styles.row}>{localized.developmentNow5}</div>
          <div className={styles.row}>{localized.developmentNow6}</div>
          <div className={styles.row}>{localized.developmentNow7}</div>
          <div className={styles.row}>{localized.developmentNow8}</div>
          <div className={styles.row}>{localized.developmentNow9}</div>
          <div className={styles.row}>{localized.developmentNow10}</div>
          <div className={styles.row}>{localized.developmentNow11}</div>
        </div>
      </div>
      <div className={styles.wrapperSecond}>
        <div className={styles.rows}>
          <div className={styles.title}>{localized.developmentTitle2}</div>
          <div className={styles.row}>{localized.developmentFuture1}</div>
          <div className={styles.row}>{localized.developmentFuture2}</div>
          <div className={styles.row}>{localized.developmentFuture3}</div>
          <div className={styles.row}>{localized.developmentFuture4}</div>
          <div className={styles.row}>{localized.developmentFuture5}</div>
          <div className={styles.row}>{localized.developmentFuture6}</div>
          <div className={styles.row}>{localized.developmentFuture7}</div>
          <div className={styles.row}>{localized.developmentFuture8}</div>
          <div className={styles.row}>{localized.developmentFuture9}</div>
          <div className={styles.row}>{localized.developmentFuture10}</div>
          <div className={styles.row}>{localized.developmentFuture11}</div>
          <div className={styles.row}>{localized.developmentFuture12}</div>
          <div className={styles.row}>{localized.developmentFuture13}</div>
          <div className={styles.row}>{localized.developmentFuture14}</div>
          <div className={styles.row}>{localized.developmentFuture15}</div>
          <div className={styles.row}>{localized.developmentFuture16}</div>
          <div className={styles.row}>{localized.developmentFuture17}</div>
          <div className={styles.row}>{localized.developmentFuture18}</div>
          <div className={styles.row}>{localized.developmentFuture19}</div>
          <div className={styles.row}>{localized.developmentFuture20}</div>
          <div className={styles.row}>{localized.developmentFuture21}</div>
          <div className={styles.row}>{localized.developmentFuture22}</div>
          <div className={styles.row}>{localized.developmentFuture23}</div>
          <div className={styles.row}>{localized.developmentFuture24}</div>
          <div className={styles.row}>{localized.developmentFuture25}</div>
          <div className={styles.row}>{localized.developmentFuture26}</div>
          <div className={styles.row}>{localized.developmentFuture27}</div>
          <div className={styles.row}>{localized.developmentFuture28}</div>
        </div>
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

      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/DevelopmentPage.png)` }}
      />
    </div>
  );
};

export default DevelopmentPage;
