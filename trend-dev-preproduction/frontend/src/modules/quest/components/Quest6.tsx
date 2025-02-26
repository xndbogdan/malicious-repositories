import React, { FC } from "react";
import styles from "../QuestPage.module.scss";
import Button from "kit/button/Button";
import localized from "helpers/localized";

const Quest6: FC = ({ setQuest }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.text}>{localized.quest6}</div>
        <div className={styles.button}>
          <Button
            secondary
            onClick={() => {
              setQuest(7);
            }}
          >
            {localized.next}
          </Button>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/quests/Quest6.png)` }}
      />
    </div>
  );
};

export default Quest6;
