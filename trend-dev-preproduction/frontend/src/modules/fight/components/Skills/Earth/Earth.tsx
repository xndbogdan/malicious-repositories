import React, { FC } from "react";
import styles from "./Earth.module.scss";
import clsx from "clsx";

const Earth: FC = ({ turn }) => {
  return (
    <div className={clsx(styles.wrapperMount, turn && styles.turn)}>
      <div className={styles.mainContainer}>
        <div className={styles.hillsContainer}>
          <div className={styles.hill}>
            {[...Array(5)].map((index) => (
              <div key={index} className="tree" />
            ))}
          </div>
          {[...Array(5)].map((index) => (
            <div key={index} className="tree" />
          ))}
        </div>
        <div className={styles.mountainContainer}>
          <div className={styles.leftMountain} />
          <div className={styles.rightMountain} />
        </div>
      </div>
    </div>
  );
};

export default Earth;
