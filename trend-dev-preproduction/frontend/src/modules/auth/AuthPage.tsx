import React, { FC, useState } from "react";
import styles from "./AuthPage.module.scss";
import Input from "kit/input/Input";
import Button from "kit/button/Button";
import Select from "kit/select/Select";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { fetchLogin } from "./store/AuthAC";
import { fetchRegistration } from "./store/AuthAC";
import { validateLength } from "helpers/validators";
import { setLanguage, setPopup } from "modules/main/store/MainSlice";

const AuthPage: FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // default language
  const [lang, setLang] = useState({ name: "English", lang: "en" });
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const changeLanguage = (code: any) => {
    setLang(code);
    dispatch(setLanguage(code.lang));
    localized.setLanguage(code.lang);
  };

  const validateData = async (type) => {
    setUsernameValid(validateLength(username, 2, true));
    setPasswordValid(validateLength(password, 4, true));

    if (
      validateLength(username, 2, true) &&
      validateLength(password, 4, true)
    ) {
      if (type === "registration") {
        dispatch(fetchRegistration({ username, password, lang: lang.lang }));
      } else {
        dispatch(fetchLogin({ username, password }));
      }
    }
  };

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.auth}>
          <img
            src="/assets/icons/User.svg"
            alt="UserIcon"
            className={styles.icon}
          />
          <div className={styles.title}>{localized.authorization}</div>
          <div className={styles.element}>
            <Input
              id="username"
              error={!usernameValid}
              errorMessage={localized.errorName}
              value={username}
              label={localized.nickname}
              length={50}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e);
                setUsernameValid(true);
              }}
              onBlur={() => {
                setUsernameValid(validateLength(username, 2, true));
              }}
            />
          </div>
          <div className={styles.element}>
            <Input
              id="password"
              error={!passwordValid}
              errorMessage={localized.errorPassword}
              value={password}
              label={localized.password}
              length={50}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e);
                setPasswordValid(true);
              }}
              onBlur={() => {
                setPasswordValid(validateLength(password, 4, true));
              }}
            />
          </div>
          <div className={styles.element}>
            <Select
              source={"lang"}
              value={lang}
              label={localized.language}
              onChange={(value) => {
                changeLanguage(value);
              }}
              list={[
                { name: "Русский", lang: "ru" },
                { name: "English", lang: "en" },
              ]}
            />
          </div>
          <div className={styles.element}>
            <Button
              onClick={() => {
                validateData();
              }}
            >
              {localized.enter}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              onClick={() => {
                validateData("registration");
              }}
            >
              {localized.register}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                dispatch(setPopup("screenshot"));
              }}
            >
              {localized.gameDemonstration}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/AuthPage.png)` }}
      />
    </div>
  );
};

export default AuthPage;
