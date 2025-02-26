import React, { FC } from "react";
import styles from "./HpBlock.module.scss";

const HpBlock: FC = ({ AI, name, maxHealth, health, lvl }) => {
  return (
    <div
      className={styles.container}
      style={{
        background: AI ? "rgb(180, 0, 10)" : "rgb(0, 30, 140)",
      }}
    >
      <div className={styles.content}>
        <span>{name}</span>
        <span>LVL: {lvl}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.label}>HP</div>
        <div className={styles.health}>
          <div
            className={styles.line}
            style={{
              width: `${health <= 0 ? 0 : (health * 100) / maxHealth}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HpBlock;
