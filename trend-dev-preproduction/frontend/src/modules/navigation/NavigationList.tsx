import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import PaulHouse from "./locations/PaulHouse";
import Buena from "./locations/Buena";
import PaulPaulHouse from "./locations/PaulPaulHouse";
import RoxyPaulHouse from "./locations/RoxyPaulHouse";
import LiliaPaulHouse from "./locations/LiliaPaulHouse";
import ZenithPaulHouse from "./locations/ZenithPaulHouse";
import SylphietteBuena from "./locations/SylphietteBuena";
import BuenaFields from "./locations/BuenaFields";
import BuenaForest from "./locations/BuenaForest";
import VillagersBuenaFields from "./locations/VillagersBuenaFields";
import HunterBuenaForest from "./locations/HunterBuenaForest";
import RoaRoad from "./locations/RoaRoad";
import localized from "helpers/localized";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setGamePage } from "modules/game/store/GameSlice";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const NavigationList: FC = () => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.user.user.location);

  return (
    <div>
      <SwitchTransition mode="out-in">
        <CSSTransition key={location} timeout={600} classNames="my-node">
          {location === "PaulHouse" ? (
            <PaulHouse location={location} />
          ) : location === "RoxyPaulHouse" ? (
            <RoxyPaulHouse location={location} />
          ) : location === "PaulPaulHouse" ? (
            <PaulPaulHouse />
          ) : location === "ZenithPaulHouse" ? (
            <ZenithPaulHouse location={location} />
          ) : location === "LiliaPaulHouse" ? (
            <LiliaPaulHouse />
          ) : location === "Buena" ? (
            <Buena location={location} />
          ) : location === "SylphietteBuena" ? (
            <SylphietteBuena location={location} />
          ) : location === "BuenaFields" ? (
            <BuenaFields location={location} />
          ) : location === "BuenaForest" ? (
            <BuenaForest location={location} />
          ) : location === "VillagersBuenaFields" ? (
            <VillagersBuenaFields location={location} />
          ) : location === "HunterBuenaForest" ? (
            <HunterBuenaForest location={location} />
          ) : location === "RoaRoad" ? (
            <RoaRoad location={location} />
          ) : (
            <div />
          )}
        </CSSTransition>
      </SwitchTransition>

      <div className={styles.itemsHelp}>
        <div
          onClick={() => {
            dispatch(setGamePage("rating"));
          }}
          className={styles.footerItem}
        >
          {localized.rating}
        </div>
        <div
          onClick={() => {
            dispatch(setGamePage("info"));
          }}
          className={styles.footerItem}
        >
          {localized.info}
        </div>
        <div
          onClick={() => {
            dispatch(setGamePage("news"));
          }}
          className={styles.footerItem}
        >
          {localized.news}
        </div>
        <div
          onClick={() => {
            dispatch(setGamePage("feedback"));
          }}
          className={styles.footerItem}
        >
          {localized.feedback}
        </div>
        <div
          onClick={() => {
            dispatch(setGamePage("development"));
          }}
          className={styles.footerItem}
        >
          {localized.development}
        </div>
      </div>
    </div>
  );
};

export default NavigationList;
