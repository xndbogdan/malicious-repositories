var express = require("express");
const { isValidObjectId } = require("mongoose");
const Donation = require("../models/donation");
const PublishedCampaign = require("../models/publishedCampaign");
const PublishedReward = require("../models/publishedReward");
const User = require("../models/user");
var router = express.Router();

// create a new donation
/**
when making a donation we need the following pieces of information:
rewardIDs
charityAmount (money on top of the rewards)
purchaseDate (we will probably fill this in for them.)
 */
router.post("/:campaignID/:userID", getPC, getUser, async (req, res) => {
  // we do not expect a purchaseDate, as we record that information here.
  const b = req.body;
  try {
    let sum = 0;
    // quick for loop to verify that all the given rewardIDs are valid
    b.rewards.forEach((reward) => {
      if (!isValidObjectId(reward)) {
        return res.status(404).json({ message: `reward ${reward} could not be found` });
      }
    });
    // make sure the rewardIDs match and that they are from the campaign given.
    const rewards = await PublishedReward.find({ _id: req.body.rewards });
    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];
      if (reward.campaign != req.params.campaignID) {
        return res.status(422).json({ message: "That reward does not belong to your campaign" }); // Unprocessable Entity
      }
      sum += reward.price;
    }
    // make sure charityAmount is valid
    if (b.charityAmount < 0) {
      return res.status(428).json({ message: "Your charity amount must be greater than or equal to 0" });
    }
    sum += b.charityAmount;
    // information validated. Create Donation
    const newDonation = new Donation({
      campaign: req.params.campaignID,
      user: req.params.userID,
      charityAmount: b.charityAmount,
      sum: sum,
      rewards: b.rewards,
    });
    await newDonation.save();
    res.user.donations.push(newDonation._id);
    await res.user.save();
    return res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all donations for a campaign
// probably used for PublishedCampaign's Overview Page
router.get("/:campaignID", getPC, async (req, res) => {
  const relevantDonations = await Donation.find({ campaign: req.params.campaignID });
  for (let i = 0; i < relevantDonations.length; i++) {
    await relevantDonations[i].populate("rewards");
    await relevantDonations[i].populate("campaign");
  }
  return res.status(200).json(relevantDonations);
});

/**
 * This is a middleware function that is to be used whenever we expect a campaign ID from the client
 * We search the database for a campaign with the given id.
 * If something random goes wrong, return status 500
 * If we cannot find a matching campaign, return status 404
 */
async function getPC(req, res, next) {
  let campaign;
  try {
    campaign = await PublishedCampaign.findById(req.params.campaignID);
    if (campaign == null) {
      return res.status(404).json({ message: "Cannot find campaign" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.campaign = campaign;
  next();
}

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

module.exports = router;
