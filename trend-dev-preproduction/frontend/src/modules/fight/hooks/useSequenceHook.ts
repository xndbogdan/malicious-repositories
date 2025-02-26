import localized from "helpers/localized";
import { useState, useEffect } from "react";
import { wait } from "./helper";
import { useSelector } from "react-redux";

// here is the whole logic of the fight
export const useSequenceHook = (Sequence) => {
  const game = useSelector((state) => state.game);
  const user = useSelector((state) => state.user.user);

  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(user.hp);
  const [aiHealth, setAiHealth] = useState(game.opponent.hp);
  const [animationPlayer, setAnimationPlayer] = useState("static");
  const [animationAi, setAnimationAi] = useState("static");
  const [message, setMessage] = useState("");

  const [skill, setSkill] = useState("");
  const [swordExp, setSwordExp] = useState(0);
  const [fireExp, setFireExp] = useState(0);
  const [waterExp, setWaterExp] = useState(0);
  const [earthExp, setEarthExp] = useState(0);
  const [airExp, setAirExp] = useState(0);
  const [healingExp, setHealingExp] = useState(0);

  let soundSword = new Audio("/assets/music/skills/SoundSword.mp3");
  let soundFire = new Audio("/assets/music/skills/SoundFire.mp3");
  let soundWater = new Audio("/assets/music/skills/SoundWater.mp3");
  let soundEarth = new Audio("/assets/music/skills/SoundGround.mp3");
  let soundAir = new Audio("/assets/music/skills/SoundAir.mp3");
  let soundHeal = new Audio("/assets/music/skills/SoundHealing.mp3");

  const attack = ({ skill, skillName, damage }) => {
    const { turn } = Sequence;
    const attacker = turn === 0 ? user : game.opponent;

    (async () => {
      setInSequence(true);
      setMessage(
        attacker.username +
          " " +
          localized.chooses.toLowerCase() +
          " " +
          skillName +
          "!",
      );

      if (turn === 0) {
        setAnimationPlayer(skill);
        setAnimationAi("damage");
      } else {
        setAnimationAi(skill);
        setAnimationPlayer("damage");
      }

      // strike animation duration
      if (skill === "attack") {
        await wait(600);
      } else {
        await wait(1000);
      }

      if (turn === 0) {
        setAnimationPlayer("static");
        setAnimationAi("static");
      } else {
        setAnimationAi("static");
        setAnimationPlayer("static");
      }

      turn === 0
        ? setAiHealth((prev) => (prev > 0 ? prev - damage : 0))
        : setPlayerHealth((prev) => (prev > 0 ? prev - damage : 0));

      await wait(400);

      if (turn === 1) setMessage(localized.yourTurn);

      setTurn(turn === 0 ? 1 : 0);
      setInSequence(false);
      setSkill("");
    })();
  };

  useEffect(() => {
    const { turn, mode } = Sequence;
    const attacker = turn === 0 ? user : game.opponent;

    if (mode) {
      switch (mode) {
        case "Attack": {
          if (game.fightSound) soundSword.play();
          let damage = 10;
          setSkill("sword");
          if (turn === 0) {
            setSwordExp(swordExp + 1);
            if (user.sword > 100) {
              damage = user.sword / 10;
            }
          } else {
            if (game.opponent.sword > 100) {
              damage = game.opponent.sword / 10;
            }
          }

          attack({
            skill: "attack",
            skillName: localized.swordHit.toLowerCase(),
            damage: damage,
          });
          break;
        }
        case "MagicFire": {
          if (game.fightSound) soundFire.play();
          let damage = 10;
          setSkill("fire");
          if (turn === 0) {
            setFireExp(fireExp + 1);
            if (user.fire > 100) {
              damage = user.fire / 100;
            }
          } else {
            if (game.opponent.fire > 100) {
              damage = game.opponent.fire / 100;
            }
          }

          attack({
            skill: "magic",
            skillName: localized.fireHit.toLowerCase(),
            damage: damage,
          });
          break;
        }
        case "MagicWater": {
          if (game.fightSound) soundWater.play();
          let damage = 10;
          setSkill("water");
          if (turn === 0) {
            setWaterExp(waterExp + 1);
            if (user.water > 100) {
              damage = user.water / 10;
            }
          } else {
            if (game.opponent.water > 100) {
              damage = game.opponent.water / 10;
            }
          }

          attack({
            skill: "magic",
            skillName: localized.waterHit.toLowerCase(),
            damage: damage,
          });
          break;
        }
        case "MagicEarth": {
          if (game.fightSound) soundEarth.play();
          let damage = 10;
          setSkill("earth");
          if (turn === 0) {
            setEarthExp(earthExp + 1);
            if (user.earth > 100) {
              damage = user.earth / 100;
            }
          } else {
            if (game.opponent.earth > 10) {
              damage = game.opponent.earth / 10;
            }
          }

          attack({
            skill: "magic",
            skillName: localized.earthHit.toLowerCase(),
            damage: damage,
          });
          break;
        }
        case "MagicAir": {
          if (game.fightSound) soundAir.play();
          let damage = 10;
          setSkill("air");
          if (turn === 0) {
            setAirExp(airExp + 1);
            if (user.air > 10) {
              damage = user.air / 10;
            }
          } else {
            if (game.opponent.air > 10) {
              damage = game.opponent.air / 10;
            }
          }

          attack({
            skill: "magic",
            skillName: localized.airHit.toLowerCase(),
            damage: damage,
          });
          break;
        }
        case "Heal": {
          if (game.fightSound) soundHeal.play();
          let heal = 10;
          setSkill("healing");
          if (turn === 0) {
            setHealingExp(healingExp + 1);
            if (user.healing > 10) {
              heal = user.healing / 10;
            }
          } else {
            if (game.opponent.healing > 10) {
              heal = game.opponent.healing / 10;
            }
          }

          (async () => {
            setInSequence(true);

            setMessage(
              attacker.username +
                " " +
                localized.chooses.toLowerCase() +
                " " +
                localized.healing.toLowerCase() +
                "!",
            );

            turn === 0 ? setAnimationPlayer("magic") : setAnimationAi("magic");
            await wait(1000);

            turn === 0
              ? setAnimationPlayer("static")
              : setAnimationAi("static");

            turn === 0
              ? setPlayerHealth((prev) =>
                  prev + heal <= user.hp ? prev + heal : user.hp,
                )
              : setAiHealth((prev) =>
                  prev + heal <= game.opponent.hp
                    ? prev + heal
                    : game.opponent.hp,
                );
            await wait(400);
            if (turn === 1) setMessage(localized.yourTurn);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setSkill("");
          })();

          break;
        }
        default:
          break;
      }
    }
  }, [Sequence]);
  return [
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
  ];
};
