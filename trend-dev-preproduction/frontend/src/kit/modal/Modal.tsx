import React, { FC } from "react";
import Button from "../button/Button";
import styles from "./Modal.module.scss";

interface ModalProps {
  subtitle?: string;
  title?: string;
  message?: string;
  buttonTextOk?: string;
  buttonTextCancel?: string;
  onCancel?: () => void;
  onAccept?: () => void;
  id?: string;
}

const Modal: FC<ModalProps> = ({
  subtitle = "",
  title = "",
  message = "",
  buttonTextOk = "",
  buttonTextCancel = "",
  onCancel = () => {},
  onAccept = () => {},
  id = "dk-modal",
}) => {
  return (
    <div className={styles.modal} id={id}>
      {subtitle && (
        <div className={styles.subtitle}>
          <p>{subtitle}</p>
        </div>
      )}

      {title && (
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
      )}

      {message && (
        <div className={styles.content}>
          <p>{message}</p>
        </div>
      )}

      <div className={styles.buttons}>
        {buttonTextOk && (
          <Button
            onClick={onAccept}
            styles={{ marginBottom: buttonTextCancel ? 8 : 0 }}
          >
            {buttonTextOk}
          </Button>
        )}

        {buttonTextCancel && (
          <Button onClick={onCancel}>{buttonTextCancel}</Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
