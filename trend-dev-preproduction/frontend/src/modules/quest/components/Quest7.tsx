import React, { FC } from "react";
import styles from "../QuestPage.module.scss";
import Button from "kit/button/Button";
import { fetchQuest } from "modules/user/store/userAC";
import { useDispatch } from "react-redux";
import localized from "helpers/localized";

const Quest7: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.text}>{localized.quest7}</div>
        <div className={styles.button}>
          <Button
            secondary
            onClick={() => {
              dispatch(fetchQuest());
            }}
          >
            {localized.next}
          </Button>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/quests/Quest7.png)` }}
      />
    </div>
  );
};

export default Quest7;
