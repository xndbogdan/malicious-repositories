import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";
import { setOpponent } from "modules/game/store/GameSlice";
import { setGamePage } from "modules/game/store/GameSlice";
import { npcName } from "modules/talk/npcName";

const SylphietteBuena: FC = ({ location }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}> {localized.silphi}</div>
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
          dispatch(
            setOpponent({
              username: npcName({ location }),
              hp: 100,
              lvl: 1,
              fire: 100,
              healing: 100,
              water: 100,
              earth: 100,
              air: 100,
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

export default SylphietteBuena;
