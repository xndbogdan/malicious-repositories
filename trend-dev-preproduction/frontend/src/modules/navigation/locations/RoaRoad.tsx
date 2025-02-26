import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";

const RoaRoad: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.roaRoad}</div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "BuenaForest" }));
        }}
        className={styles.item}
      >
        {localized.buenaForest}
      </div>
    </div>
  );
};

export default RoaRoad;
