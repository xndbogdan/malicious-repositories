import React, { FC } from "react";
import clsx from "clsx";
import styles from "./Air.module.scss";

const Air: FC = ({ turn }) => {
  return (
    <div className={clsx(styles.container, turn && styles.turn)}>
      {[...Array(104)].map((index) => (
        <div key={index} className={styles.flake} />
      ))}
    </div>
  );
};

export default Air;
