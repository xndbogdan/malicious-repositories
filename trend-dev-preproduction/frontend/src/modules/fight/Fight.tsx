import React, { FC, useState, useEffect } from "react";
import styles from "./Fight.module.scss";
import HpBlock from "./components/HpBlock/HpBlock";
import BattleMenu from "./components/BattleMenu/BattleMenu";
import Button from "kit/button/Button";
import Fire from "./components/Skills/Fire/Fire";
import Sword from "./components/Skills/Sword/Sword";
import Healing from "./components/Skills/Healing/Healing";
import Water from "./components/Skills/Water/Water";
import Air from "./components/Skills/Air/Air";
import Earth from "./components/Skills/Earth/Earth";
import clsx from "clsx";
import localized from "helpers/localized";
import { useAi } from "./hooks/useAiHook";
import { useSequenceHook } from "./hooks/useSequenceHook";
import { useDispatch, useSelector } from "react-redux";
import { useMessageHook } from "./hooks/useMessageHook";
import { setFightSound } from "modules/game/store/GameSlice";
import { fetchExp } from "modules/user/store/userAC";
import { setInfo, setError } from "modules/main/store/MainSlice";
import { imgOpponent } from "./imgOpponent";
import { imgBgFight } from "./imgBgFight";

const Fight: FC = () => {
  const dispatch = useDispatch();

  const opponent = useSelector((state) => state.game.opponent);
  const user = useSelector((state) => state.user.user);
  const fightSound = useSelector((state) => state.game.fightSound);

  const [sequence, setSequence] = useState("");

  const [
    turn,
    inSequence,
    playerHealth,
    aiHealth,
    animationPlayer,
    animationAi,
    message,
    skill,
    swordExp,
    fireExp,
    waterExp,
    earthExp,
    airExp,
    healingExp,
  ] = useSequenceHook(sequence);
  const [aichoes] = useAi({ turn, opponent });

  useEffect(() => {
    if (aiHealth > 0 && aichoes && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aichoes });
    }
  }, [turn, aichoes, inSequence]);

  const exp = () => {
    if (swordExp || fireExp || waterExp || earthExp || airExp || healingExp) {
      return (
        localized.yesExp.toLowerCase() +
        " " +
        (opponent.money
          ? localized.mon.toLowerCase() + " " + opponent.money + "; "
          : "") +
        (swordExp
          ? localized.expSword.toLowerCase() + " " + swordExp + "; "
          : "") +
        (fireExp
          ? localized.expFire.toLowerCase() + " " + fireExp + "; "
          : "") +
        (waterExp
          ? localized.expWater.toLowerCase() + " " + waterExp + "; "
          : "") +
        (earthExp
          ? localized.expEarth.toLowerCase() + " " + earthExp + "; "
          : "") +
        (airExp ? localized.expAir.toLowerCase() + " " + airExp + "; " : "") +
        (healingExp
          ? localized.expHeal.toLowerCase() + " " + healingExp + ";"
          : "")
      );
    } else {
      return localized.noExp.toLowerCase();
    }
  };

  useEffect(() => {
    if (aiHealth <= 0) {
      exp();
      dispatch(
        fetchExp({
          money: opponent.money || 0,
          sword: swordExp,
          fire: fireExp,
          water: waterExp,
          earth: earthExp,
          air: airExp,
          healing: healingExp,
        }),
      );

      dispatch(setInfo(localized.youWin + " " + exp()));
    } else if (playerHealth <= 0) {
      dispatch(
        fetchExp({
          money: 0,
          sword: swordExp,
          fire: fireExp,
          water: waterExp,
          earth: earthExp,
          air: airExp,
          healing: healingExp,
        }),
      );

      dispatch(setError(localized.noHp + " " + exp()));
    }
  }, [playerHealth, aiHealth]);

  return (
    <div className={styles.popup}>
      <div
        className={styles.container}
        style={{ backgroundImage: imgBgFight({ location: user.location }) }}
      >
        <div className={styles.dashboard}>
          <HpBlock
            name={user.username}
            maxHealth={user.hp}
            lvl={user.lvl}
            health={playerHealth}
          />
          <HpBlock
            AI
            name={opponent.username}
            maxHealth={opponent.hp}
            lvl={opponent.lvl}
            health={aiHealth}
          />
        </div>

        <div className={styles.character}>
          <div className={styles.playerSprite}>
            <img
              src="/assets/rudeus/RudeusSmall.png"
              alt="PlayerImage"
              className={clsx(styles[animationPlayer], styles.img)}
            />
            {turn === 1 ? (
              <>
                {skill === "sword" ? (
                  <Sword turn={true} />
                ) : skill === "fire" ? (
                  <Fire turn={true} />
                ) : skill === "water" ? (
                  <Water turn={true} />
                ) : skill === "earth" ? (
                  <Earth turn={true} />
                ) : skill === "air" ? (
                  <Air turn={true} />
                ) : (
                  <div />
                )}
              </>
            ) : (
              <>{skill === "healing" && <Healing turn={true} />}</>
            )}
          </div>
          <div className={styles.opponentSprite}>
            <img
              src={imgOpponent({ location: user.location })}
              alt="AiImage"
              className={clsx(styles[animationAi], styles.img)}
            />

            {turn === 0 ? (
              <>
                {skill === "sword" ? (
                  <Sword />
                ) : skill === "fire" ? (
                  <Fire />
                ) : skill === "water" ? (
                  <Water />
                ) : skill === "earth" ? (
                  <Earth />
                ) : skill === "air" ? (
                  <Air />
                ) : (
                  <div />
                )}
              </>
            ) : (
              <>{skill === "healing" && <Healing />}</>
            )}
          </div>
        </div>
        <div className={styles.control}>
          <BattleMenu
            disabled={!(!inSequence && turn === 0)}
            onAttack={() => {
              setSequence({ turn, mode: "Attack" });
            }}
            onHeal={() => {
              setSequence({ turn, mode: "Heal" });
            }}
            onMagicFire={() => {
              setSequence({ turn, mode: "MagicFire" });
            }}
            onMagicWater={() => {
              setSequence({ turn, mode: "MagicWater" });
            }}
            onMagicEarth={() => {
              setSequence({ turn, mode: "MagicEarth" });
            }}
            onMagicAir={() => {
              setSequence({ turn, mode: "MagicAir" });
            }}
          />

          <div className={styles.wrapper}>
            <div className={styles.message}>
              {useMessageHook(
                message || localized.whatAttak + " " + user.username + "?",
              )}
            </div>
            <div className={styles.elements}>
              <div className={styles.element}>
                <Button
                  style={{
                    height: "40px",
                  }}
                  onClick={() => {
                    dispatch(setFightSound());
                  }}
                >
                  {fightSound ? localized.soundOff : localized.soundOn}
                </Button>
              </div>
              <div className={styles.element}>
                <Button
                  style={{
                    height: "40px",
                  }}
                  onClick={() => {
                    dispatch(
                      fetchExp({
                        money: 0,
                        sword: swordExp,
                        fire: fireExp,
                        water: waterExp,
                        earth: earthExp,
                        air: airExp,
                        healing: healingExp,
                      }),
                    );
                    dispatch(setError(localized.escapeText + " " + exp()));
                  }}
                >
                  {localized.escape}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fight;
