import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setOpponent } from "modules/game/store/GameSlice";
import { npcName } from "modules/talk/npcName";

const BuenaForest: FC = ({ location }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.buenaForest}</div>

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
          dispatch(fetchLocation({ location: "RoaRoad" }));
        }}
        className={styles.item}
      >
        {localized.roaRoad}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "HunterBuenaForest" }));
        }}
        className={styles.item}
      >
        {localized.hunter}
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
        {localized.wolfFight}
      </div>
    </div>
  );
};

export default BuenaForest;
