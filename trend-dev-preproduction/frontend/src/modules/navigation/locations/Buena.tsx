import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setOpponent } from "modules/game/store/GameSlice";
import { npcName } from "modules/talk/npcName";

const Buena: FC = ({ location }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}> {localized.buena}</div>
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
          dispatch(fetchLocation({ location: "SylphietteBuena" }));
        }}
        className={styles.item}
      >
        {localized.silphi}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "BuenaFields" }));
        }}
        className={styles.item}
      >
        {localized.buenaFields}
      </div>
      <div
        onClick={() => {
          dispatch(
            setOpponent({
              username: npcName({ location }),
              money: 1,
              hp: 100,
              lvl: 1,
              sword: 100,
            }),
          );
        }}
        className={styles.item}
      >
        {localized.hoolFight}
      </div>
    </div>
  );
};

export default Buena;
