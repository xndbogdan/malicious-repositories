import React, { FC } from "react";
import styles from "../Navigation.module.scss";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLocation } from "modules/locations/store/locationAC";

const PaulHouse: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.items}>
      <div className={styles.location}>{localized.paulHouse}</div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "RoxyPaulHouse" }));
        }}
        className={styles.item}
      >
        {localized.roxy}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "PaulPaulHouse" }));
        }}
        className={styles.item}
      >
        {localized.paul}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "ZenithPaulHouse" }));
        }}
        className={styles.item}
      >
        {localized.zenith}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "LiliaPaulHouse" }));
        }}
        className={styles.item}
      >
        {localized.lilia}
      </div>
      <div
        onClick={() => {
          dispatch(fetchLocation({ location: "Buena" }));
        }}
        className={styles.item}
      >
        {localized.buena}
      </div>
    </div>
  );
};

export default PaulHouse;
