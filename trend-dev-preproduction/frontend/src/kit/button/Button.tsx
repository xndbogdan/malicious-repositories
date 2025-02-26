import React, { FC } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonProps {
  secondary?: boolean;
  disabled?: boolean;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
  style?: any;
  unclickable?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    secondary = false,
    disabled = false,
    description = "",
    error = false,
    errorMessage = "",
    children,
    onClick = () => {},
    small = false,
    style = {},
    unclickable = false,
  } = props;

  return (
    <>
      <div className={styles.container}>
        <button
          style={{ ...style }}
          onClick={onClick}
          disabled={disabled}
          className={clsx(
            styles.textContainer,
            disabled && styles.disabled,
            small && styles.small,
            secondary ? styles.secondary : styles.primary,
            unclickable && styles.unclickable,
          )}
        >
          <div className={styles.children}>{children}</div>
        </button>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      {error && errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </>
  );
};

export default Button;
