export const changeQuest = ({ user, next, skip }) => {
  if (user.quest === 1) {
    if (user.location === "RoxyPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 2) {
    if (
      user.location === "RoxyPaulHouse" &&
      user.water >= 10 &&
      user.fire >= 10 &&
      user.air >= 10 &&
      user.earth >= 10
    ) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 3) {
    if (user.location === "PaulPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 4) {
    if (user.location === "PaulPaulHouse" && user.sword >= 30) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 5) {
    if (user.location === "ZenithPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 6) {
    if (user.location === "ZenithPaulHouse" && user.healing >= 30) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 7) {
    if (user.location === "LiliaPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 8) {
    if (user.location === "SylphietteBuena") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 9) {
    if (user.location === "SylphietteBuena" && user?.mobs >= 5) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 10) {
    if (user.location === "SylphietteBuena" && user?.mobs >= 10) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 11) {
    if (user.location === "VillagersBuenaFields") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 12) {
    if (user.location === "VillagersBuenaFields" && user?.mobs >= 10) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 13) {
    if (user.location === "HunterBuenaForest") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 14) {
    if (user.location === "HunterBuenaForest" && user?.mobs >= 10) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 15) {
    if (user.location === "RoxyPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 16) {
    if (
      user.location === "RoxyPaulHouse" &&
      user.water >= 200 &&
      user.fire >= 200 &&
      user.air >= 200 &&
      user.earth >= 200
    ) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 17) {
    if (user.location === "PaulPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 18) {
    if (user.location === "PaulPaulHouse" && user.sword >= 200) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 19) {
    if (user.location === "ZenithPaulHouse") {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 20) {
    if (user.location === "ZenithPaulHouse" && user.healing >= 200) {
      next();
    } else {
      skip();
    }
  } else if (user.quest === 21) {
    skip();
  }
};
