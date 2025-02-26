import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setGamePage, setOpponent } from "modules/game/store/GameSlice";
import { npcName } from "modules/talk/npcName";

const PaulPaulHouse: FC = ({ location }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.paul}</div>
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
          dispatch(
            setOpponent({
              username: npcName({ location }),
              hp: 100,
              lvl: 1,
              sword: 100,
            }),
          );
        }}
        className={styles.item}
      >
        {localized.training}
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

export default PaulPaulHouse;
