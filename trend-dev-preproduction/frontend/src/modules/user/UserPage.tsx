import React, { FC, useState } from "react";
import styles from "./UserPage.module.scss";
import Button from "kit/button/Button";
import Select from "kit/select/Select";
import localized from "helpers/localized";
import { setGamePage } from "modules/game/store/GameSlice";
import { setPage } from "modules/main/store/MainSlice";
import { fetchLang } from "modules/user/store/userAC";
import { useDispatch, useSelector } from "react-redux";

const UserPage: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const [lang, setLang] = useState();

  const changeLanguage = (code: any) => {
    setLang(code);
    dispatch(fetchLang({ lang: code.lang }));
    localized.setLanguage(code.lang);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <p className={styles.left}>{localized.name}</p>
            <p className={styles.right}>{user.username}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.lvl}</p>
            <p className={styles.right}>{user.lvl}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.health}</p>
            <p className={styles.right}>{user.hp}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.money}</p>
            <p className={styles.right}>{user.money}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.sword}</p>
            <p className={styles.right}>{user.sword}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.fire}</p>
            <p className={styles.right}>{user.fire}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.water}</p>
            <p className={styles.right}>{user.water}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.earth}</p>
            <p className={styles.right}>{user.earth}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.air}</p>
            <p className={styles.right}>{user.air}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.healing}</p>
            <p className={styles.right}>{user.healing}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.left}>{localized.experience}</p>
            <p className={styles.right}>{user.exp}</p>
          </div>
        </div>
      </div>

      <div className={styles.wrapperSecond}>
        <div className={styles.elements}>
          <div className={styles.element}>
            <Button
              onClick={() => {
                dispatch(setGamePage(""));
              }}
              secondary
            >
              {localized.close}
            </Button>
          </div>
          <div className={styles.element}>
            <Select
              source={"name"}
              value={lang}
              label={localized.changeLanguage}
              onChange={(value) => {
                changeLanguage(value);
              }}
              list={[
                { name: "Русский", lang: "ru" },
                { name: "English", lang: "en" },
              ]}
            />
          </div>
          <div className={styles.element}>
            <Button
              onClick={() => {
                dispatch(setPage("auth"));
                dispatch(setGamePage(""));
                localStorage.removeItem("token");
              }}
              secondary
            >
              {localized.exit}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/UserPage.png)` }}
      />
    </div>
  );
};

export default UserPage;
