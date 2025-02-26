import { useState, useEffect } from "react";

export const useAi = ({ turn, opponent }) => {
  const [aiChoes, setAiChoes] = useState("");
  const [option, setOption] = useState([]);

  useEffect(() => {
    const array = [];
    for (const key in opponent) {
      switch (key) {
        case "sword":
          array.push("Attack");
          break;
        case "fire":
          array.push("MagicFire");
          break;
        case "water":
          array.push("MagicWater");
          break;
        case "earth":
          array.push("MagicEarth");
          break;
        case "air":
          array.push("MagicAir");
          break;
        case "healing":
          array.push("Heal");
          break;
      }
    }

    setOption(array);
  }, []);

  useEffect(() => {
    if (turn === 1) {
      setAiChoes(option[Math.floor(Math.random() * option.length)]);
    } else {
      setAiChoes("playersTurn");
    }
  }, [turn]);

  return [aiChoes];
};
