import React, { FC } from "react";
import styles from "./Water.module.scss";

const Water: FC = () => {
  return (
    <div className={styles.wrapperCloud}>
      <div className={styles.cloud1}>
        <div className={styles.cloud1Face}>
          <span />
          <span />
        </div>
        <div className={styles.cloud1Clouds1}>
          <span />
        </div>
        <div className={styles.cloud1Clouds2}>
          {[...Array(4)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud1Clouds3}>
          {[...Array(6)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud1Clouds4}>
          {[...Array(8)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud1Clouds5}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud1Rain}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud1Lightning}>
          {[...Array(3)].map((index) => (
            <div key={index} />
          ))}
        </div>
      </div>
      <div className={styles.cloud2}>
        <div className={styles.cloud1Face}>
          <span />
          <span />
        </div>
        <div className={styles.cloud2Clouds1}>
          <span />
        </div>
        <div className={styles.cloud2Clouds2}>
          {[...Array(4)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud2Clouds3}>
          {[...Array(6)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud2Clouds4}>
          {[...Array(8)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud2Clouds5}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud2Rain}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud2Lightning}>
          {[...Array(3)].map((index) => (
            <div key={index} />
          ))}
        </div>
      </div>

      <div className={styles.cloud3}>
        <div className={styles.cloud1Face}>
          <span />
          <span />
        </div>
        <div className={styles.cloud3Clouds1}>
          <span />
        </div>
        <div className={styles.cloud3Clouds2}>
          {[...Array(4)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud3Clouds3}>
          {[...Array(6)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud3Clouds4}>
          {[...Array(8)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud3Clouds5}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud3Rain}>
          {[...Array(13)].map((index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.cloud3Lightning}>
          {[...Array(3)].map((index) => (
            <div key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Water;
