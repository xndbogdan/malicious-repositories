import React, { FC } from "react";
import styles from "./Preloader.module.scss";

interface PreloaderProps {
  loading?: boolean;
  background?: number;
}

const Preloader: FC<PreloaderProps> = ({
  loading = false,
  background = 0.2,
}) => {
  return (
    <>
      {loading && (
        <>
          <div style={{ opacity: background }} className={styles.background} />
          <div className={styles.wrapper}>
            <div className={styles.loader} />
          </div>
        </>
      )}
    </>
  );
};

export default Preloader;
