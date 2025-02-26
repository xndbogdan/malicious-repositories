import React, { FC } from "react";
import NavigationHeader from "./NavigationHeader";
import NavigationList from "./NavigationList";
import NavigationFooter from "./NavigationFooter";
import styles from "./Navigation.module.scss";

const Navigation: FC = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <div>
          <NavigationHeader />
          <NavigationList />
        </div>
        <NavigationFooter />
      </div>
    </div>
  );
};

export default Navigation;
