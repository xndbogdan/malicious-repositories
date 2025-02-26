import localized from "helpers/localized";

export const questsText = ({ location, quest }) => {
  if (quest === 1) {
    if (location === "RoxyPaulHouse") {
      return localized.q11;
    } else {
      return localized.q12;
    }
  } else if (quest === 2) {
    if (location === "RoxyPaulHouse") {
      return localized.q21;
    } else {
      return localized.q22;
    }
  } else if (quest === 3) {
    if (location === "RoxyPaulHouse") {
      return localized.q31;
    } else if (location === "PaulPaulHouse") {
      return localized.q32;
    } else {
      return localized.q33;
    }
  } else if (quest === 4) {
    if (location === "PaulPaulHouse") {
      return localized.q41;
    } else {
      return localized.q42;
    }
  } else if (quest === 5) {
    if (location === "PaulPaulHouse") {
      return localized.q51;
    } else if (location === "ZenithPaulHouse") {
      return localized.q52;
    } else {
      return localized.q53;
    }
  } else if (quest === 6) {
    if (location === "ZenithPaulHouse") {
      return localized.q61;
    } else {
      return localized.q62;
    }
  } else if (quest === 7) {
    if (location === "ZenithPaulHouse") {
      return localized.q71;
    } else if (location === "LiliaPaulHouse") {
      return localized.q72;
    } else {
      return localized.q73;
    }
  } else if (quest === 8) {
    if (location === "LiliaPaulHouse") {
      return localized.q81;
    } else if (location === "SylphietteBuena") {
      return localized.q82;
    } else {
      return localized.q83;
    }
  } else if (quest === 9) {
    if (location === "SylphietteBuena") {
      return localized.q91;
    } else {
      return localized.q92;
    }
  } else if (quest === 10) {
    if (location === "SylphietteBuena") {
      return localized.q101;
    } else {
      return localized.q102;
    }
  } else if (quest === 11) {
    if (location === "SylphietteBuena") {
      return localized.q111;
    } else if (location === "VillagersBuenaFields") {
      return localized.q112;
    } else {
      return localized.q113;
    }
  } else if (quest === 12) {
    if (location === "VillagersBuenaFields") {
      return localized.q121;
    } else {
      return localized.q122;
    }
  } else if (quest === 13) {
    if (location === "VillagersBuenaFields") {
      return localized.q131;
    } else if (location === "HunterBuenaForest") {
      return localized.q132;
    } else {
      return localized.q133;
    }
  } else if (quest === 14) {
    if (location === "HunterBuenaForest") {
      return localized.q141;
    } else {
      return localized.q142;
    }
  } else if (quest === 15) {
    if (location === "HunterBuenaForest") {
      return localized.q151;
    } else if (location === "RoxyPaulHouse") {
      return localized.q152;
    } else {
      return localized.q153;
    }
  } else if (quest === 16) {
    if (location === "RoxyPaulHouse") {
      return localized.q161;
    } else {
      return localized.q162;
    }
  } else if (quest === 17) {
    if (location === "RoxyPaulHouse") {
      return localized.q171;
    } else if (location === "PaulPaulHouse") {
      return localized.q172;
    } else {
      return localized.q173;
    }
  } else if (quest === 18) {
    if (location === "PaulPaulHouse") {
      return localized.q181;
    } else {
      return localized.q182;
    }
  } else if (quest === 19) {
    if (location === "PaulPaulHouse") {
      return localized.q191;
    } else if (location === "ZenithPaulHouse") {
      return localized.q192;
    } else {
      return localized.q193;
    }
  } else if (quest === 20) {
    if (location === "ZenithPaulHouse") {
      return localized.q201;
    } else {
      return localized.q202;
    }
  } else if (quest === 21) {
    if (location === "ZenithPaulHouse") {
      return localized.q211;
    } else {
      return localized.q212;
    }
  }
};
