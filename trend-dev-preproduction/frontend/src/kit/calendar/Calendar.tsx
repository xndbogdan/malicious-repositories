import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { ReactComponent as DeleteMiniIcon } from "./DeleteMini.svg";
import { ReactComponent as CalendarIcon } from "./Calendar.svg";
import styles from "./Calendar.module.scss";

// для работы необходима библиотека react-date-picker@8.4.0

interface CalendarProps {
  locale?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  day?: string;
  month?: string;
  year?: string;
}

const Calendar: FC<CalendarProps> = ({
  locale = "",
  value = "",
  onChange = () => {},
  name = "",
  label = "",
  day = "Day",
  month = "Month",
  year = "Year",
}) => {
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenClick, setIsOpenClick] = useState(false);

  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [update]);

  return (
    <div
      className={styles.calendar}
      onClick={(e) => {
        if (!open) {
          setIsOpenClick(true);
        }
      }}
    >
      <span className={styles.label}>{label}</span>
      {!update && (
        <DatePicker
          isOpen={isOpenClick}
          value={value instanceof Date ? value : ""}
          onChange={(date) => {
            if (date && date.length > 10) {
              setUpdate(true);
              return;
            }
            onChange(date);
          }}
          closeCalendar={update}
          onCalendarOpen={() => {
            setOpen(true);
          }}
          onCalendarClose={() => {
            setUpdate(true);
            setOpen(false);
            setIsOpenClick(false);
          }}
          minDate={new Date("1900-01-01")}
          maxDate={new Date("2200-12-31")}
          name={name}
          dayPlaceholder={day?.toLowerCase()}
          monthPlaceholder={month?.toLowerCase()}
          yearPlaceholder={year?.toLowerCase()}
          format={"dd/MM/y"}
          className={styles.wrapper}
          calendarClassName={styles.modal}
          locale={locale}
          calendarIcon={
            open || value ? null : <CalendarIcon className={styles.icon} />
          }
          clearIcon={
            value && (
              <DeleteMiniIcon
                className={styles.clearIcon}
                style={{ opacity: 0.6 }}
              />
            )
          }
        />
      )}
    </div>
  );
};

export default Calendar;
