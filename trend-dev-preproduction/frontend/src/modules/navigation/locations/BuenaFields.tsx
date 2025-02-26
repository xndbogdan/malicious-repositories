import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setOpponent } from "modules/game/store/GameSlice";
import { npcName } from "modules/talk/npcName";

const BuenaFields: FC = ({ location }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.buenaFields}</div>

      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "Buena" }));
        }}
        className={styles.item}
      >
        {localized.buena}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "BuenaForest" }));
        }}
        className={styles.item}
      >
        {localized.buenaForest}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "VillagersBuenaFields" }));
        }}
        className={styles.item}
      >
        {localized.villagers}
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
        {localized.banditFight}
      </div>
    </div>
  );
};

export default BuenaFields;
