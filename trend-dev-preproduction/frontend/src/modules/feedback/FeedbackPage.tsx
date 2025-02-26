import React, { FC, useState } from "react";
import styles from "./FeedbackPage.module.scss";
import Input from "kit/input/Input";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { useDispatch } from "react-redux";
import { setGamePage } from "modules/game/store/GameSlice";
import { fetchSuggest, fetchProblem } from "./store/FeedbackAC";
import { validateLength, validateEmail } from "helpers/validators";

const FeedbackPage: FC = () => {
  const dispatch = useDispatch();

  const [suggest, setSuggest] = useState("");
  const [suggestValid, setSuggestValid] = useState(true);
  const [problem, setProblem] = useState("");
  const [problemValid, setProblemValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {localized.myEmail + " mushokutenseiapp@gmail.com"}{" "}
        </div>
        <div className={styles.element}>
          <Input
            id="suggest"
            value={suggest}
            label={localized.suggest}
            length={500}
            error={!suggestValid}
            errorMessage={localized.yourSuggest}
            description={localized.haveSuggest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSuggest(e);
              setSuggestValid(true);
            }}
          />
        </div>
        <div className={styles.element}>
          <Button
            onClick={() => {
              setSuggestValid(validateLength(suggest, 5, true));
              setEmailValid(validateEmail(email, false));
              if (
                validateLength(suggest, 5, true) &&
                validateEmail(email, false)
              ) {
                dispatch(fetchSuggest({ message: suggest, email }));
                setSuggest("");
                setEmail("");
              }
            }}
          >
            {localized.send}
          </Button>
        </div>
        <div className={styles.element}>
          <Input
            id="problem"
            value={problem}
            label={localized.problemDesc}
            length={500}
            error={!problemValid}
            errorMessage={localized.descProblem}
            description={localized.haveProblem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProblem(e);
              setProblemValid(true);
            }}
          />
        </div>
        <div className={styles.element}>
          <Button
            onClick={() => {
              setProblemValid(validateLength(problem, 5, true));
              setEmailValid(validateEmail(email, false));
              if (
                validateLength(problem, 5, true) &&
                validateEmail(email, false)
              ) {
                dispatch(fetchProblem({ message: problem, email }));
                setProblem("");
                setEmail("");
              }
            }}
          >
            {localized.send}
          </Button>
        </div>

        <div className={styles.element}>
          <Input
            id="email"
            value={email}
            label={localized.yourEmail}
            length={50}
            type="email"
            error={!emailValid}
            errorMessage={localized.emailError}
            description={localized.optionalField}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e);
              setEmailValid(true);
            }}
            onBlur={() => {
              setEmailValid(validateEmail(email, false));
            }}
          />
        </div>
        <div className={styles.element}>
          <Button
            secondary
            description={localized.commentPlease}
            onClick={() => {
              dispatch(setGamePage(""));
            }}
          >
            {localized.close}
          </Button>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/FeedbackPage.png)` }}
      />
    </div>
  );
};

export default FeedbackPage;
