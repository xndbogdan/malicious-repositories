const Router = require("express");
const router = new Router();
const controller = require("./controller");
const { check } = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");

router.post(
  "/registration",
  [
    check("username").notEmpty(),
    check("password").isLength({ min: 4, max: 50 }),
  ],
  controller.registration,
);

router.post("/login", controller.login);
router.get("/user", authMiddleware, controller.getUser);
router.get("/users", authMiddleware, controller.getUsers);
router.get("/chats", authMiddleware, controller.getChats);
router.get("/checkToken", authMiddleware, controller.checkToken);
router.post("/location", authMiddleware, controller.changeLocation);
router.post("/exp", authMiddleware, controller.changeExp);
router.post("/quest", authMiddleware, controller.changeQuest);
router.post("/lang", authMiddleware, controller.changeLang);
router.post(
  "/chat",
  [check("message").notEmpty()],
  authMiddleware,
  controller.chat,
);
router.post(
  "/suggest",
  [check("message").notEmpty()],
  authMiddleware,
  controller.suggest,
);
router.post(
  "/problem",
  [check("message").notEmpty()],
  authMiddleware,
  controller.problem,
);
controller.getItems();

module.exports = router;
