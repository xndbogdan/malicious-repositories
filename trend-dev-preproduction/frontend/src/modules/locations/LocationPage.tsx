import React, { FC, useEffect, useState } from "react";
import styles from "./LocationPage.module.scss";
import Bird from "./bird/Bird";
import { bird } from "./bird";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const LocationPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [birdStatus, setBirdStatus] = useState(false);

  useEffect(() => {
    setBirdStatus(false);
    setTimeout(() => setBirdStatus(bird(user.location)));
  }, [user.location]);

  return (
    <div>
      {birdStatus && <Bird />}
      <SwitchTransition mode="out-in">
        <CSSTransition key={user.location} timeout={600} classNames="fade">
          {user.location === "PaulHouse" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/PaulHouse.png)`,
              }}
            />
          ) : user.location === "RoxyPaulHouse" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/RoxyPaulHouse.png)`,
              }}
            />
          ) : user.location === "PaulPaulHouse" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/PaulPaulHouse.png)`,
              }}
            />
          ) : user.location === "ZenithPaulHouse" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/ZenithPaulHouse.png)`,
              }}
            />
          ) : user.location === "LiliaPaulHouse" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/LiliaPaulHouse.png)`,
              }}
            />
          ) : user.location === "Buena" ? (
            <div
              className={styles.background}
              style={{ backgroundImage: `url(/assets/locations/Buena.png)` }}
            />
          ) : user.location === "SylphietteBuena" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/SylphietteBuena.png)`,
              }}
            />
          ) : user.location === "BuenaFields" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/BuenaFields.png)`,
              }}
            />
          ) : user.location === "HunterBuenaForest" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/HunterBuenaForest.png)`,
              }}
            />
          ) : user.location === "VillagersBuenaFields" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/VillagersBuenaFields.png)`,
              }}
            />
          ) : user.location === "BuenaForest" ? (
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(/assets/locations/BuenaForest.png)`,
              }}
            />
          ) : user.location === "RoaRoad" ? (
            <div
              className={styles.background}
              style={{ backgroundImage: `url(/assets/locations/RoaRoad.png)` }}
            />
          ) : (
            <div />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default LocationPage;
