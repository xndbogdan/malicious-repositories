var express = require("express");
var router = express.Router();
const UnpublishedCampaign = require("../models/unpublishedCampaign");
const PublishedCampaign = require("../models/publishedCampaign");
const PublishedReward = require("../models/publishedReward");
const User = require("../models/user");
const Image = require("../models/image");
const { isValidObjectId } = require("mongoose");

/***** FOR HEADER/Account Overview *****/

/* Create Unpublished Campaign */
router.post("/:userID", getUser, async (req, res) => {
  const b = req.body;
  // check for correct params
  if (!b.title || !b.subtitle || !b.description || !b.goal || !b.duration) {
    return res.status(428).json({ message: "Missing necessary information" }); // Precondition Required
  }
  // check for invalid data
  try {
    if (b.mainImage) {
      if (!(isValidObjectId(b.mainImage) && (await Image.findById(b.mainImage)))) {
        return res.status(404).json({ message: "Image not found" }); // Not Found
      }
    }
    if (b.goal <= 0) {
      return res.status(428).json({ message: "Invalid goal amount" }); // Precondition Required
    }
    if (b.duration <= 0) {
      return res.status(428).json({ message: "Invalid duration amount" }); // Precondition Required
    }

    // no errors, make campaign
    const newUC = new UnpublishedCampaign({
      title: b.title,
      subtitle: b.subtitle,
      description: b.description,
      owner: res.user.username,
      goal: b.goal,
      duration: b.duration,
    });

    if (b.mainImage) {
      newUC.mainImage = b.mainImage; // already verified it exists
    }

    const savedUC = await newUC.save();
    res.user.unpublishedCampaignsOwned.push(savedUC._id);
    await res.user.save();
    res.status(201).json(savedUC);
  } catch (error) {
    res.status(500).json(error);
  }
});

/***** FOR OVERVIEW *****/
// we don't have an overview endpoint for unpublished campaigns because there is not information to display here.
// those who have unpublished campaigns should be editing their campaign settings, content, and rewards.
// overview only contains information like how well your campaign is doing.
// relatedly, if you are on this page, you can publish your campaign here.

/* TODO: Publish an Unpublished Campaign */
router.patch("/publish/:campaignID/:userID", getCampaign, getUser, async (req, res) => {
  // We can assume all in the stored campaign are valid values. We still must ensure that the content is not still empty though.
  // Check Empty Contents
  const UC = res.campaign;
  if (UC.content.length <= 0) {
    return res.status(422).json({ message: "A Published Campaign must have Content" }); // Unprocessable Entity
  }
  // publish
  try {
    // make new publishedDocument
    const PC = new PublishedCampaign({
      title: UC.title,
      subtitle: UC.subtitle,
      description: UC.description,
      mainImage: UC.mainImage,
      owner: UC.owner,
      goal: UC.goal,
      duration: UC.duration,
      content: UC.content,
      publishDate: new Date(Date.now()).toISOString(),
      viewsByDate: [],
      rewards: [],
    });
    await PC.save();

    // make new Published Rewards
    const newPublicRewards = [];
    for (let i = 0; i < res.campaign.rewards.length; i++) {
      const r = res.campaign.rewards[i];
      const reward = new PublishedReward({
        campaign: PC._id,
        name: r.name,
        price: r.price,
        description: r.description,
        expectedDeliveryDate: new Date(r.expectedDeliveryDate).toISOString(),
      });
      await reward.save();
      newPublicRewards.push(reward._id);
    }
    PC.rewards = newPublicRewards;
    await PC.save();
    await PC.populate("rewards");
    // update user's publishedList
    res.user.publishedCampaignsOwned.push(PC._id);
    // update user's unpublishedList
    await res.user.updateOne({ $pull: { unpublishedCampaignsOwned: res.campaign._id } }); // autosaves
    // delete unpublishedDocument
    await UC.remove();
    // update user
    await res.user.save();
    res.status(201).json(PC); // Created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/***** FOR SETTINGS *****/

/* Edit Unpublished Settings */
router.patch("/settings/:campaignID/:userID", getCampaign, getUser, async (req, res) => {
  const b = req.body;
  try {
    // verify the given information is correct
    if (b.mainImage && !isValidObjectId(b.mainImage)) {
      const potentialImage = await Image.findById(b.mainImage);
      if (potentialImage.length <= 0) {
        return res.status(404).json({ message: "Image not found" }); // Not Found
      }
    }
    if (b.goal && b.goal <= 0) {
      return res.status(428).json({ message: "Invalid goal amount" }); // Precondition Required
    }
    if (b.duration && b.duration <= 0) {
      return res.status(428).json({ message: "Invalid duration amount" }); // Precondition Required
    }
    // update unpublished campaign
    let updatedKeys = Object.keys(b);
    updatedKeys.forEach((key) => {
      res.campaign[key] = b[key];
    });
    // respond with new data
    const updatedUC = await res.campaign.save();
    return res.json(updatedUC);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Delete Campaign */
router.delete("/:campaignID/:userID", getCampaign, getUser, async (req, res) => {
  try {
    // make sure user owns this campaign
    if (!res.user.unpublishedCampaignsOwned.find((campaignID) => campaignID == req.params.campaignID)) {
      return res.status(403).json({ message: "You do not own this campaign" }); // Forbidden
    }
    // remove from owner
    await res.user.updateOne({ $pull: { unpublishedCampaignsOwned: res.campaign._id } }); // autosaves
    // delete campaign
    await res.campaign.remove();
    res.status(205).json({ message: "Deleted Campaign" }); // Reset Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/***** FOR EDIT CONTENT *****/

/* Edit Unpublished Content */
router.patch("/content/:campaignID/:userID", getCampaign, getUser, async (req, res) => {
  const b = req.body;
  try {
    // verify the given information is correct
    const contents = b.content;
    for (let i = 0; i < contents.length; i++) {
      const section = contents[i];
      if (!ValidContentTypes[section.type]) {
        // there is a content here that does not conform to our accepted Content Types.
        return res.status(428).json({ message: "Invalid Content Type" }); // Precondition Required
      }
      if (!section.content) {
        return res.status(428).json({ message: "Every piece of content must have something to display." }); // Precondition Required
      }
    }
    // seems good to me.
    res.campaign.content = contents;
    const updatedUC = await res.campaign.save();
    return res.json(updatedUC);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

/***** FOR EDIT REWARDS *****/

/* Edit Unpublished Rewards */
router.patch("/rewards/:campaignID/:userID", getCampaign, getUser, async (req, res) => {
  const b = req.body;
  try {
    // verify the given information is correct
    const rewards = b.rewards;
    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];
      if (!reward.name || !reward.description || reward.price <= 0) {
        return res.status(428).json({ message: "Invalid Reward Properties" }); // Precondition Required
      }
      const rewardDate = new Date(reward.expectedDeliveryDate);
      const today = new Date(Date.now());
      if (rewardDate < today) {
        return res.status(428).json({ message: "Date must be after today" }); // Precondition Required
      }
    }
    // seems good to me.
    res.campaign.rewards = rewards;
    const updatedUC = await res.campaign.save();
    return res.json(updatedUC);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

/*********************** FOR DEBUGGING ********************************/

/* GET all campaigns. FOR DEBUGGING PURPOSES ONLY */
// currently it returns all the campaigns in the campaign db.
router.get("/", async (req, res) => {
  try {
    // Campaign.deleteMany();
    const campaigns = await UnpublishedCampaign.find();
    res.json(campaigns);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

/* GET a specific campaign listing by id. FOR DEBUGGING PURPOSES ONLY */
router.get("/:campaignID", getCampaign, function (req, res) {
  res.json(res.campaign);
});

/* PATCH Campaign. FOR DEBUG PURPOSES ONLY. THIS DOES NOT DO ANY DATA VALIDATION*/
router.patch("/:campaignID", getCampaign, async (req, res) => {
  // update the given campaign information
  let updatedKeys = Object.keys(req.body);
  updatedKeys.forEach((key) => {
    res.campaign[key] = req.body[key];
  });

  try {
    const updatedCampaign = await res.campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* DELETE ALL CAMPAIGNS. FOR DEBUGGING PURPOSES ONLY */
router.delete("/", async (req, res) => {
  try {
    await UnpublishedCampaign.deleteMany();
    const campaigns = await UnpublishedCampaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

const ValidContentTypes = {
  Header: true,
  Paragraph: true,
  Image: true,
  Video: true,
};
