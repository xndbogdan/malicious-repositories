import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import Button from "kit/button/Button";
import Music from "modules/music/Music";
import localized from "helpers/localized";
import { useDispatch, useSelector } from "react-redux";
import { setChatStatus } from "modules/chat/store/ChatSlice";
import { questsFooter } from "modules/talk/questsFooter";

const NavigationFooter: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const chatStatus = useSelector((state) => state.chat.chatStatus);

  return (
    <div className={styles.rows}>
      <div className={styles.quest}>{questsFooter()}</div>
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
      <div className={styles.button}>
        <Button
          onClick={() => {
            dispatch(setChatStatus());
          }}
          secondary
          style={{
            height: "40px",
            backgroundColor: "#ebebeb",
          }}
        >
          {chatStatus ? localized.closeChat : localized.chat}
        </Button>
      </div>
      <Music />
    </div>
  );
};

export default NavigationFooter;
