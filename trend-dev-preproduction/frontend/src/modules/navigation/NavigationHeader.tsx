import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import UserIcon from "assets/jsx/UserIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setGamePage } from "modules/game/store/GameSlice";

const NavigationHeader: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.header}>
      <div
        className={styles.title}
        onClick={() => {
          dispatch(setGamePage("user"));
        }}
      >
        <div className={styles.user}>
          <UserIcon />
        </div>
        <div className={styles.headerUser}>{user.user.username}</div>
      </div>
    </div>
  );
};

export default NavigationHeader;
