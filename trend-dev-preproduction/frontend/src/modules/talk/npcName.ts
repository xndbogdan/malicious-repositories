import localized from "helpers/localized";

export const npcName = ({ location }) => {
  switch (location) {
    case "RoxyPaulHouse":
      return localized.roxy;
    case "PaulPaulHouse":
      return localized.paul;
    case "ZenithPaulHouse":
      return localized.zenith;
    case "LiliaPaulHouse":
      return localized.lilia;
    case "Buena":
      return localized.hooligan;
    case "SylphietteBuena":
      return localized.silphi;
    case "BuenaFields":
      return localized.bandit;
    case "BuenaForest":
      return localized.wolf;
    case "VillagersBuenaFields":
      return localized.villagers;
    case "HunterBuenaForest":
      return localized.hunter;
    default:
      return "";
  }
};
