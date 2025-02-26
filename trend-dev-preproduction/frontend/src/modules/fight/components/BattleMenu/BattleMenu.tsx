import React, { FC } from "react";
import Button from "kit/button/Button";
import styles from "./BattleMenu.module.scss";
import localized from "helpers/localized";

const BattleMenu: FC = ({
  disabled,
  onAttack,
  onHeal,
  onMagicFire,
  onMagicWater,
  onMagicEarth,
  onMagicAir,
}) => {
  return (
    <div className={styles.skills}>
      <div className={styles.elements}>
        <div className={styles.element}>
          <Button
            style={{
              backgroundColor: "#b40009",
              marginBottom: 10,
            }}
            unclickable={disabled}
            onClick={onAttack}
          >
            {localized.swordHit}
          </Button>
        </div>
        <div className={styles.element}>
          <Button
            style={{
              backgroundColor: "#011e8b",
              marginBottom: 10,
            }}
            unclickable={disabled}
            onClick={onMagicFire}
          >
            {localized.fireHit}
          </Button>
        </div>
        <div className={styles.element}>
          <Button
            style={{
              backgroundColor: "#011e8b",
              marginBottom: 10,
            }}
            unclickable={disabled}
            onClick={onMagicWater}
          >
            {localized.waterHit}
          </Button>
        </div>
      </div>
      <div className={styles.skills}>
        <div className={styles.elements}>
          <div className={styles.element}>
            <Button
              style={{
                backgroundColor: "#011e8b",
              }}
              unclickable={disabled}
              onClick={onMagicEarth}
            >
              {localized.earthHit}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              style={{
                backgroundColor: "#011e8b",
              }}
              unclickable={disabled}
              onClick={onMagicAir}
            >
              {localized.airHit}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              style={{
                backgroundColor: "#008000",
              }}
              unclickable={disabled}
              onClick={onHeal}
            >
              {localized.healing}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleMenu;
