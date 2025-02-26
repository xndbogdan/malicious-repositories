import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

interface SelectProps {
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  disabled?: boolean;
  list?: Array<any>;
  error?: boolean;
  errorMessage?: string;
  source?: string;
  multiple?: boolean;
}

const Select: FC<SelectProps> = ({
  value = "",
  onChange = () => {},
  label = "",
  description = "",
  disabled = false,
  list = [],
  error = false,
  errorMessage = "",
  multiple = false,
  source = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (!source) {
      setSelectedValue(value);
    } else {
      setSelectedValue(value?.[source] ?? "");
    }
  }, [value, source]);

  return (
    <>
      {open && !disabled && (
        <div className={styles.background} onClick={() => setOpen(false)} />
      )}
      <div
        className={styles.container}
        style={{ zIndex: open && !disabled ? 2 : "auto" }}
      >
        <div
          className={clsx(
            styles.content,
            error && styles.error,
            disabled && styles.disabled,
          )}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p className={styles.label}>{label}</p>
          <p className={styles.chosen}>
            {multiple
              ? value.length
                ? value.map((item, i) => {
                    const listItem = source ? item?.[source] : item;
                    if (value.length > 1 && i === 0) {
                      return (
                        <span key={listItem}>
                          {listItem}
                          {`; +${value.length - 1}`}
                        </span>
                      );
                    } else if (value.length > 1 && i !== 0) {
                      return null;
                    }

                    return (
                      <span key={listItem}>
                        {listItem}
                        {i < value.length - 1 ? "; " : ""}
                      </span>
                    );
                  })
                : ""
              : selectedValue && <span>{selectedValue}</span>}
          </p>
        </div>
        {!disabled && open && (
          <div className={styles.search}>
            {list.length &&
              list.map((item, index) => {
                const listItem = source ? item?.[source] : item;
                return (
                  <p
                    className={clsx(
                      multiple && value?.some
                        ? value?.some((val) => val[source] === listItem) &&
                            styles.active
                        : listItem === selectedValue && styles.active,
                    )}
                    key={listItem}
                    onClick={(event) => {
                      if (multiple) {
                        const array = [];
                        if (value) {
                          array.push(...value);
                          if (
                            value.find((elem) => elem[source] === item[source])
                          ) {
                            onChange(
                              value.filter(
                                (elem) => elem[source] !== item[source],
                              ),
                            );
                          } else {
                            array.push(item);
                            onChange(array);
                          }
                        } else {
                          array.push(item);
                          onChange(array);
                        }
                      } else {
                        onChange(item);
                        setOpen(false);
                      }
                    }}
                  >
                    {listItem}
                  </p>
                );
              })}
          </div>
        )}

        {description && <p className={styles.description}>{description}</p>}

        {error && errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default Select;
