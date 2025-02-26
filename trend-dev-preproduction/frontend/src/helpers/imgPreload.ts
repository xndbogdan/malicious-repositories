export const imgPreload = ({ auth }) => {
  const beforeAuth = [
    "/assets/pages/AuthPage.png",
    "/assets/icons/User.svg",
    "/assets/screenshots/Screen1.png",
    "/assets/screenshots/Screen2.png",
    "/assets/screenshots/Screen3.png",
    "/assets/screenshots/Screen4.png",
    "/assets/screenshots/Screen1ru.png",
    "/assets/screenshots/Screen2ru.png",
    "/assets/screenshots/Screen3ru.png",
    "/assets/screenshots/Screen4ru.png",

    "/assets/quests/Quest1.png",
    "/assets/quests/Quest2.png",
    "/assets/quests/Quest3.png",
    "/assets/quests/Quest4.png",
    "/assets/quests/Quest5.png",
    "/assets/quests/Quest6.png",
    "/assets/quests/Quest7.png",
  ];

  const images = [
    "/assets/locations/RoxyPaulHouse.png",
    "/assets/locations/PaulHouse.png",
    "/assets/locations/PaulPaulHouse.png",
    "/assets/locations/ZenithPaulHouse.png",
    "/assets/locations/LiliaPaulHouse.png",
    "/assets/locations/Buena.png",
    "/assets/locations/SylphietteBuena.png",
    "/assets/locations/BuenaFields.png",
    "/assets/locations/HunterBuenaForest.png",
    "/assets/locations/VillagersBuenaFields.png",
    "/assets/locations/BuenaForest.png",
    "/assets/locations/RoaRoad.png",
    "/assets/locations/hawk/hawk-body.png",
    "/assets/locations/hawk/hawk-wing-left.png",
    "/assets/locations/hawk/hawk-wing-right.png",

    "/assets/backgrounds/RoxyFight.png",
    "/assets/backgrounds/PaulFight.png",
    "/assets/backgrounds/ZenithFight.png",
    "/assets/backgrounds/SylphietteFight.png",
    "/assets/backgrounds/HooliganFight.png",
    "/assets/backgrounds/BanditFight.png",
    "/assets/backgrounds/WoldFight.png",

    "/assets/opponents/BanditBuena.png",
    "/assets/opponents/Hooligan.png",
    "/assets/opponents/Paul.png",
    "/assets/opponents/Roxy.png",
    "/assets/opponents/Sylphiette.png",
    "/assets/opponents/Wolf.png",
    "/assets/opponents/Zenith.png",
    "/assets/rudeus/RudeusSmall.png",

    "/assets/pages/DevelopmentPage.png",
    "/assets/pages/FeedbackPage.png",
    "/assets/pages/InfoPage.png",
    "/assets/pages/NewsPage.png",
    "/assets/pages/RatingPage.png",
    "/assets/pages/UserPage.png",
  ];

  if (!auth) images.unshift(...beforeAuth);

  const promises = [];
  images.forEach(function (src) {
    promises.push(
      new Promise((resolve) => {
        const proxyImage = new Image();
        proxyImage.addEventListener("load", function () {
          resolve();
        });
        proxyImage.src = src;
      }),
    );
  });
};
