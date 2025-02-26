import React, { FC } from "react";
import styles from "./Bird.module.scss";

const Bird: FC = () => {
  return (
    <div className={styles.hawk}>
      <div className={styles.right} />
      <div className={styles.body} />
      <div className={styles.left} />
    </div>
  );
};

export default Bird;
