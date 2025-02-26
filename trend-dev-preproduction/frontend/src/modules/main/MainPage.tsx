import React, { FC, useEffect } from "react";
import AuthPage from "modules/auth/AuthPage";
import GamePage from "modules/game/GamePage";
import Message from "kit/message/Message";
import Preloader from "kit/preloder/Preloader";
import ScreenshotPage from "modules/screenshot/ScreenshotPage";
import StubMobile from "kit/stubMobile/StubMobile";
import localized from "helpers/localized";
import { imgPreload } from "helpers/imgPreload";
import { fetchCheckToken } from "./store/MainAC";
import { setGamePage } from "modules/game/store/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage, setPage } from "./store/MainSlice";
import { RootState } from "store/store";
import { CSSTransition } from "react-transition-group";
import { setLanguage } from "modules/main/store/MainSlice";

const MainPage: FC = () => {
  const dispatch = useDispatch();

  const main = useSelector((state: RootState) => state.main);
  const loading = useSelector((state: RootState) => state.main.loading);

  useEffect(() => {
    localized.setLanguage("en");
    if (localStorage.getItem("token")) {
      dispatch(fetchCheckToken());
      imgPreload({ auth: true });
    } else {
      dispatch(setPage("auth"));
      imgPreload({ auth: false });
    }
  }, []);

  const closeInfo = () => {
    dispatch(closeMessage());
    dispatch(setGamePage(""));
  };

  const changeLanguage = (code: string) => {
    dispatch(setLanguage(code));
    localized.setLanguage(code);
  };

  return (
    <div>
      <Preloader loading={loading} background={0} />
      <StubMobile
        maxWidth={639}
        title={localized.mobileErrorTitle}
        text={localized.mobileErrorText}
        language={main.language || "en"}
        changeLanguage={changeLanguage}
      />
      <CSSTransition
        in={main.message}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <Message
          id="main"
          title={main.infoTitle}
          message={main.infoText}
          isError={main.isError}
          onAccept={closeInfo}
        />
      </CSSTransition>

      <CSSTransition
        in={main.popup === "screenshot"}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <ScreenshotPage />
      </CSSTransition>

      {main.page === "auth" && <AuthPage />}
      {main.page === "game" && <GamePage />}
    </div>
  );
};

export default MainPage;
