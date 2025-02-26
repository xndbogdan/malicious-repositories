import React, { FC, useState } from "react";
import styles from "./UsersPage.module.scss";
import Table from "kit/table/Table";
import Button from "kit/button/Button";
import localized from "helpers/localized";
import { sortBy } from "helpers/functions";
import { setGamePage } from "modules/game/store/GameSlice";
import { useDispatch, useSelector } from "react-redux";

const RatingPage: FC = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const [filter, setFilter] = useState("exp");

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <Table
            columns={[
              {
                title: localized.name,
                key: "username",
                type: "string",
              },
              {
                title: localized.lvl,
                key: "lvl",
                type: "number",
              },
              {
                title: localized.experience,
                key: "exp",
                type: "number",
              },
              {
                title: localized.health,
                key: "hp",
                type: "number",
              },
              {
                title: localized.sword,
                key: "sword",
                type: "number",
              },
              {
                title: localized.fire,
                key: "fire",
                type: "number",
              },
              {
                title: localized.water,
                key: "water",
                type: "number",
              },
              {
                title: localized.earth,
                key: "earth",
                type: "number",
              },
              {
                title: localized.air,
                key: "air",
                type: "number",
              },
              {
                title: localized.healing,
                key: "healing",
                type: "number",
              },
              {
                title: localized.money,
                key: "money",
                type: "number",
              },
            ]}
            rows={[...users].sort(sortBy(filter, false, parseInt))}
            noData={localized.noData}
          />
        </div>
        <div className={styles.elements}>
          <div className={styles.element}>
            <Button
              onClick={() => {
                dispatch(setGamePage(""));
              }}
            >
              {localized.close}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("exp");
              }}
            >
              {localized.experience}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("hp");
              }}
            >
              {localized.health}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("sword");
              }}
            >
              {localized.sword}
            </Button>
          </div>
          <div className={styles.elem}>
            <Button
              secondary
              onClick={() => {
                setFilter("fire");
              }}
            >
              {localized.fire}
            </Button>
          </div>
        </div>
        <div className={styles.elements}>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("water");
              }}
            >
              {localized.water}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("earth");
              }}
            >
              {localized.earth}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("air");
              }}
            >
              {localized.air}
            </Button>
          </div>
          <div className={styles.element}>
            <Button
              secondary
              onClick={() => {
                setFilter("healing");
              }}
            >
              {localized.healing}
            </Button>
          </div>
          <div className={styles.elem}>
            <Button
              secondary
              onClick={() => {
                setFilter("money");
              }}
            >
              {localized.money}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(/assets/pages/RatingPage.png)` }}
      />
    </div>
  );
};

export default RatingPage;
