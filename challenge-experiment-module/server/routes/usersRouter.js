var express = require("express");
var router = express.Router();
const User = require("../models/user");
const UnpublishedCampaign = require("../models/unpublishedCampaign");
const PublishedCampaign = require("../models/publishedCampaign");

/***** FOR REAL *****/

/* Sign Up */
router.post("/", async (req, res) => {
  // check for correct params
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(422).json({ message: "Missing necessary account information" }); // Unprocessable Entity
  }

  // check for duplicate username
  let potentialUser = await User.findOne({ username: req.body.username });
  if (potentialUser != null) {
    return res.status(409).json({ message: "Username is already taken" }); // Conflict
  }

  // no errors, make user:
  const body = req.body;
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    password: body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ userID: newUser._id }); // Created
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Log In */
router.get("/Login", async function (req, res) {
  let user;
  try {
    // find user with username/password. If either is missing, user will be null.
    user = await User.findOne({
      username: req.query.username,
      password: req.query.password,
    });
    if (user == null) {
      // username and password is wrong
      return res.status(401).json({ message: "Invalid Credentials" }); // Unauthorized
    }
    // found corresponding account
    return res.status(200).json({ userID: user._id }); // Reset Content
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/* Account Overview */
router.get("/:userID", getUser, async function (req, res) {
  // middleware found the user.
  await res.user.populate("unpublishedCampaignsOwned");
  await res.user.populate("publishedCampaignsOwned");
  await res.user.populate("publishedCampaignsOwned.rewards");
  await res.user.populate("donations");
  await res.user.populate("donations.campaign");
  await res.user.populate("donations.rewards");
  return res.status(200).json(res.user); // OK
});

/* Saving Account Settings */
router.patch("/settings/:userID", getUser, async (req, res) => {
  // middleware found the user
  try {
    // if they wanted to change username, make sure it's not already taken
    if (req.body.username) {
      const potentialUser = await User.findOne({ username: req.body.username });
      if (potentialUser && potentialUser._id != req.params.userID) {
        return res.status(409).json({ message: "Username is already taken" }); // Conflict
      }
    }

    // update with given user settings
    let updatedKeys = Object.keys(req.body);
    for (let i = 0; i < updatedKeys.length; i++) {
      const key = updatedKeys[i];
      // if they updated their username, update the owner value on all of their owned campaigns
      if (key == "username" && res.user.username != req.body.username) {
        await UnpublishedCampaign.updateMany({ _id: res.user.unpublishedCampaignsOwned }, { owner: req.body.username });
        await PublishedCampaign.updateMany({ _id: res.user.publishedCampaignsOwned }, { owner: req.body.username });
      }
      // only allow changes to values found in Account Settings
      if ((key == "firstName" || key == "lastName" || key == "username" || key == "password") && req.body[key]) {
        res.user[key] = req.body[key];
      }
    }

    const updateduser = await res.user.save();
    return res.status(200).json(updateduser); // Reset Content
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/* Deleting Account in Account Settings */
router.delete("/:userID", getUser, async (req, res) => {
  // middleware found user

  try {
    // check donations
    if (res.user.donations.length > 0) {
      return res.status(428).json({ message: "Cannot delete account with donations" }); // Precondition Required
    }

    // check published campaigns
    if (res.user.publishedCampaignsOwned.length > 0) {
      return res.status(428).json({ message: "Cannot delete account with a published Campaign" }); // Precondition Required
    }
    // preconditions checked, start deletion.

    // delete all unpublished campaigns
    const promises = [];
    res.user.populate("unpublishedCampaignsOwned");
    const campaigns = res.user.unpublishedCampaignsOwned;
    campaigns.forEach(async (campaign) => promises.push(campaign.remove()));
    // delete user
    promises.push(res.user.remove());
    await Promise.all(promises);
    return res.status(205).json({ message: "Deleted user" }); // Reset Content
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* Donate */
router.post("/Donate/:campaignID,/:userID", getCampaign, getUser, async (req, res) => {
  // check for correct params
  const b = req.body;
  if (!b.purchaseDate || !b.total || !b.rewards) {
    return res.status(428).json({ message: "Missing necessary information" }); // Precondition Required
  }
  for (let i = 0; i < b.rewards.length; i++) {
    const r = b.rewards[i];
    if (!r.name || !r.price || !r.description || !r.expectedDeliveryDate) {
      return res.status(428).json({ message: "Missing necessary information" }); // Precondition Required
    }
  }
  // check for invalid data
  // heads up, we are NOT doing Date validation. If they donated just now, they can exclude the date.
  // otherwise we can assume admins are filling in data with "fake" donations.
  // additionally, we are assuming that the reward information is correct.
  if (b.total < 0) {
    return res.status(428).json({ message: "Invalid Donation Total" }); // Precondition Required
  }
  if (!res.campaign.isPublished) {
    return res.status(428).json({ message: "Campaign is not Published" }); // Precondition Required
  }

  // no errors, make donation:
  res.user.donations.push({
    campaignID: req.params.campaignID,
    purchaseDate: b.purchaseDate,
    total: b.total,
    rewards: b.rewards,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ userID: newUser._id }); // Created
  } catch (error) {
    res.status(500).json(error);
  }
});

/***** FOR DEBUGGING *****/

// This get doesn't really do anything, but i'm just returning a json like everything else expects instead of html
router.get("/", async (req, res) => {
  const users = await User.find(); // for debugging only
  res.json(users); // for debugging only
  // res.status(404).json({ message: "/users does not exist! Try providing a user ID!" }); // Not Found
});

/* DELETE ALL USERS. FOR DEBUGGING PURPOSES ONLY */
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany();
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * This is a middleware function that is to be used whenever we expect a user ID from the client
 * We search the database for a user with the given id.
 * If something random goes wrong, return status 500
 * If we cannot find a matching user, return status 404
 */
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.userID);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

/**
 * This is a middleware function that is to be used whenever we expect a campaign ID from the client
 * We search the database for a campaign with the given id.
 * If something random goes wrong, return status 500
 * If we cannot find a matching campaign, return status 404
 */
async function getCampaign(req, res, next) {
  let campaign;
  try {
    campaign = await UnpublishedCampaign.findById(req.params.campaignID);
    if (campaign == null) {
      return res.status(404).json({ message: "Cannot find campaign" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.campaign = campaign;
  next();
}

module.exports = router;
