import React, { FC } from "react";
import styles from "./Popup.module.scss";

interface PopupProps {
  closeText?: string;
  infoText?: string;
  close?: () => void;
  width?: string;
  children?: React.ReactNode;
}

const Popup: FC<PopupProps> = ({
  closeText,
  infoText,
  close,
  width,
  children,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container} style={{ width: width }}>
        <div className={styles.header}>
          <p className={styles.contentLabel}>{infoText}</p>
          <div
            className={styles.close}
            onClick={() => {
              close(false);
            }}
          >
            <p>{closeText?.toLowerCase()}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
