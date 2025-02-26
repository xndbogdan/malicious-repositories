import React, { FC } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";
import InputMask from "react-input-mask";
import useEmailAutocomplete from "use-email-autocomplete";

// для работы нужна библиотека react-input-mask@2.0.4
// для работы нужна библиотека use-email-autocomplete@1.0.7

interface InputProps {
  id: string;
  value?: string;
  label?: string;
  allowed?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  description?: string;
  errorMessage?: string;
  length?: number;
  style?: any;
}

const Input: FC<InputProps> = ({
  id = "",
  value = "",
  label = "",
  allowed = "all",
  type = "",
  onChange = () => {},
  onBlur = () => {},
  disabled = false,
  error = false,
  description = "",
  errorMessage = "",
  length = 600,
  style = "",
}) => {
  const {
    email,
    onChange: handleEmailChange,
    bind,
  } = useEmailAutocomplete({
    domains: [
      "yandex.ru",
      "mail.ru",
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "rambler.ru",
      "bk.ru",
      "index.ru",
      "list.ru",
      "mygiftcard.ru",
    ],
  });

  const handleChange = (e) => {
    handleEmailChange(e);
    if (email.address?.trim().length <= length) onChange(email.address?.trim());
  };

  return (
    <div
      className={clsx(
        styles.container,
        error && styles.error,
        disabled && styles.disabled,
      )}
    >
      {type === "phone" ? (
        <InputMask
          id={id}
          name={id}
          className={styles.input}
          disabled={disabled}
          value={value}
          data-empty={Boolean(!value)}
          onChange={(e) => {
            if (e.target.value.length <= length) onChange(e.target.value);
          }}
          onBlur={() => {
            onBlur();
          }}
          mask="+7 999 999 99 99"
          maskChar={null}
          style={{ ...style }}
        />
      ) : type === "email" ? (
        <input
          {...bind}
          onChange={handleChange}
          id={id}
          name={id}
          className={styles.input}
          disabled={disabled}
          value={value}
          data-empty={Boolean(!value)}
          onBlur={() => {
            onBlur();
          }}
          style={{ ...style }}
        />
      ) : type === "textarea" ? (
        <textarea
          style={{ ...style }}
          id={id}
          name={id}
          className={styles.input}
          disabled={disabled}
          value={value}
          data-empty={Boolean(!value)}
          onChange={(e) => {
            const value = e.target.value;
            if (allowed === "numbers") {
              if (/^[0-9]*$/.test(value) && value.length <= length) {
                onChange(value);
              }
            } else {
              if (value.length <= length) onChange(value);
            }
          }}
          onBlur={() => {
            onBlur();
          }}
        />
      ) : (
        <input
          style={{ ...style }}
          id={id}
          name={id}
          className={styles.input}
          disabled={disabled}
          value={value}
          type={type === "password" && "password"}
          data-empty={Boolean(!value)}
          onChange={(e) => {
            const value = e.target.value;
            if (allowed === "numbers") {
              if (/^[0-9]*$/.test(value) && value.length <= length) {
                onChange(value);
              }
            } else {
              if (value.length <= length) onChange(value);
            }
          }}
          onBlur={() => {
            onBlur();
          }}
        />
      )}

      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      {description && <p className={styles.description}>{description}</p>}

      {error && errorMessage && (
        <p className={styles.description}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
