import React, { FC, useState } from "react";
import styles from "./LanguageMenu.module.scss";

interface LanguageMenuProps {
  languages: Array<any>;
  language?: string;
  changeLanguage?: () => void;
}

const LanguageMenu: FC<LanguageMenuProps> = ({
  languages,
  language,
  changeLanguage,
}) => {
  const [openLang, setOpenLang] = useState(false);

  return (
    <>
      {openLang && (
        <div className={styles.background} onClick={() => setOpenLang(false)} />
      )}
      <div className={styles.menu}>
        <div className={styles.header} onClick={() => setOpenLang(true)}>
          <div className={styles.icon}>{language}</div>
        </div>
        {openLang && (
          <div className={styles.dropdown}>
            {languages.map((lang) => {
              return (
                <div
                  key={lang.code}
                  className={styles.item}
                  onClick={() => {
                    setOpenLang(false);
                    changeLanguage(lang.code);
                  }}
                >
                  {lang.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageMenu;
