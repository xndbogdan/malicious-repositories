import React, { FC, useState } from "react";
import styles from "./QuestPage.module.scss";
import Quest1 from "./components/Quest1";
import Quest2 from "./components/Quest2";
import Quest3 from "./components/Quest3";
import Quest4 from "./components/Quest4";
import Quest5 from "./components/Quest5";
import Quest6 from "./components/Quest6";
import Quest7 from "./components/Quest7";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const QuestPage: FC = () => {
  const [quest, setQuest] = useState(1);

  return (
    <div className={styles.popup}>
      <SwitchTransition mode="out-in">
        <CSSTransition key={quest} timeout={600} classNames="fade">
          {quest === 1 ? (
            <Quest1 setQuest={setQuest} />
          ) : quest === 2 ? (
            <Quest2 setQuest={setQuest} />
          ) : quest === 3 ? (
            <Quest3 setQuest={setQuest} />
          ) : quest === 4 ? (
            <Quest4 setQuest={setQuest} />
          ) : quest === 5 ? (
            <Quest5 setQuest={setQuest} />
          ) : quest === 6 ? (
            <Quest6 setQuest={setQuest} />
          ) : quest === 7 ? (
            <Quest7 setQuest={setQuest} />
          ) : (
            <div />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default QuestPage;
