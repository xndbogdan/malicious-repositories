import React, { FC } from "react";
import styles from "./Sword.module.scss";

const Sword: FC = () => {
  return (
    <div className={styles.square}>
      <div className={styles.sword}>
        <div className={styles.blade} />
        <div className={styles.handle} />
      </div>
    </div>
  );
};

export default Sword;
