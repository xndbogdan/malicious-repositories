export const imgBgFight = ({ location }) => {
  switch (location) {
    case "RoxyPaulHouse":
      return "url(/assets/backgrounds/RoxyFight.png)";
    case "PaulPaulHouse":
      return "url(/assets/backgrounds/PaulFight.png)";
    case "ZenithPaulHouse":
      return "url(/assets/backgrounds/ZenithFight.png)";
    case "SylphietteBuena":
      return "url(/assets/backgrounds/SylphietteFight.png)";
    case "Buena":
      return "url(/assets/backgrounds/HooliganFight.png)";
    case "BuenaFields":
      return "url(/assets/backgrounds/BanditFight.png)";
    case "BuenaForest":
      return "url(/assets/backgrounds/WoldFight.png)";
    default:
      return "";
  }
};
