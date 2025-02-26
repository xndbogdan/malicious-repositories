export const imgOpponent = ({ location }) => {
  switch (location) {
    case "RoxyPaulHouse":
      return "/assets/opponents/Roxy.png";
    case "PaulPaulHouse":
      return "/assets/opponents/Paul.png";
    case "ZenithPaulHouse":
      return "/assets/opponents/Zenith.png";
    case "SylphietteBuena":
      return "/assets/opponents/Sylphiette.png";
    case "Buena":
      return "/assets/opponents/Hooligan.png";
    case "BuenaFields":
      return "/assets/opponents/BanditBuena.png";
    case "BuenaForest":
      return "/assets/opponents/Wolf.png";
    default:
      return "";
  }
};
