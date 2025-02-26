import React, { FC } from "react";
import styles from "./Talk.module.scss";
import localized from "helpers/localized";
import { questsText } from "./questsText";
import { npcName } from "./npcName";
import { changeQuest } from "./changeQuest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { fetchQuest } from "modules/user/store/userAC";
import { setGamePage } from "modules/game/store/GameSlice";

const Talk: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const next = () => {
    dispatch(fetchQuest());
  };

  const skip = () => {
    dispatch(setGamePage(""));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.contentLabel}>
            {npcName({ location: user.location })}:
          </div>
          <div
            className={styles.close}
            onClick={() => {
              changeQuest({ user, next, skip });
            }}
          >
            {localized.next}
          </div>
        </div>
        {questsText({ location: user.location, quest: user.quest })}
      </div>
    </div>
  );
};

export default Talk;
