import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setGamePage } from "modules/game/store/GameSlice";

const LiliaPaulHouse: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.lilia}</div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "PaulHouse" }));
        }}
        className={styles.item}
      >
        {localized.paulHouse}
      </div>
      <div
        onClick={() => {
          dispatch(setGamePage("talk"));
        }}
        className={styles.item}
      >
        {localized.talk}
      </div>
    </div>
  );
};

export default LiliaPaulHouse;
