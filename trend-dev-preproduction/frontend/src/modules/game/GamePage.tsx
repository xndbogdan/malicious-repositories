import React, { FC } from "react";
import styles from "./GamePage.module.scss";
import Navigation from "modules/navigation/Navigation";
import LocationPage from "modules/locations/LocationPage";
import Fight from "modules/fight/Fight";
import UserPage from "modules/user/UserPage";
import Talk from "modules/talk/Talk";
import Chat from "modules/chat/Chat";
import FeedbackPage from "modules/feedback/FeedbackPage";
import InfoPage from "modules/info/InfoPage";
import RatingPage from "modules/users/UsersPage";
import QuestPage from "modules/quest/QuestPage";
import NewsPage from "modules/news/NewsPage";
import DevelopmentPage from "modules/development/DevelopmentPage";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { CSSTransition } from "react-transition-group";

const GamePage: FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const chat = useSelector((state: RootState) => state.chat);
  const quest = useSelector((state: RootState) => state.user.user.quest);

  return (
    <div className={styles.wrapper}>
      <CSSTransition
        in={game.gamePage === "fight"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <Fight />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "user"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <UserPage />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "talk"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <Talk />
      </CSSTransition>

      <CSSTransition
        in={chat.chatStatus}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <Chat />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "feedback"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <FeedbackPage />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "info"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <InfoPage />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "rating"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <RatingPage />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "news"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <NewsPage />
      </CSSTransition>

      <CSSTransition
        in={game.gamePage === "development"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <DevelopmentPage />
      </CSSTransition>

      <CSSTransition
        in={quest === 0}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <QuestPage />
      </CSSTransition>

      <Navigation />
      <div className={styles.gamePage}>
        <LocationPage />
      </div>
    </div>
  );
};

export default GamePage;
