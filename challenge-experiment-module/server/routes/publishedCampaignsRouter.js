var express = require("express");
var router = express.Router();
const axios = require("axios");
const PublishedCampaign = require("../models/publishedCampaign");
const User = require("../models/user");
const Image = require("../models/image");
const Donation = require("../models/donation");
const { isValidObjectId } = require("mongoose");

/***** FOR PUBLIC PAGE *****/
router.get("/view/:campaignID", getCampaign, async (req, res) => {
  try {
    const c = res.campaign;
    await c.populate("rewards");
    // update c.views
    c.views.push(Date.now());
    await c.save();
    return res.status(200).json(c);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/***** FOR HOME PAGE *****/

// Get Featured
// Top 3 Campaigns with the highest amount of visits from that last week
router.get("/featured", async (req, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 24 * 60 * 60 * 1000 * 7); // minus how many milliseconds there are in a week
    const viewedWithinTheDay = await PublishedCampaign.find({ views: { $gte: oneWeekAgo } });
    // for each campaign, determine how many views it has that are greater than oneDayAgo.
    for (let i = 0; i < viewedWithinTheDay.length; i++) {
      const c = viewedWithinTheDay[i];
      let viewsInLastDay = 0;
      const views = c.views;
      for (let j = 0; j < views.length; j++) {
        const v = views[j];
        if (new Date(v) >= oneWeekAgo) {
          viewsInLastDay++;
        }
      }
      c.viewsInLastDay = viewsInLastDay;
      console.log(c.viewsInLastDay);
    }
    viewedWithinTheDay.sort((c1, c2) => {
      return c1.viewsInLastDay - c2.viewsInLastDay;
    });
    const result = [];
    for (let i = 0; i < 3; i++) {
      const best = viewedWithinTheDay.pop();
      if (best) {
        result.push(best);
      } else {
        break;
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get Recommended
// Top 5 most donated to campaigns in the last week
router.get("/recommended", async (req, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 24 * 60 * 60 * 1000 * 7); // minus how many milliseconds there are in a week
    const donationsWithinTheDay = await Donation.find({ purchaseDate: { $gte: oneWeekAgo } });
    // track the total donations each campaign got within the last day
    const donationTracker = {};
    for (let i = 0; i < donationsWithinTheDay.length; i++) {
      const d = donationsWithinTheDay[i];
      if (donationTracker[d.campaign]) {
        donationTracker[d.campaign] = donationTracker[d.campaign] + d.sum;
      } else {
        donationTracker[d.campaign] = d.sum;
      }
    }
    // put the campaigns and their past-day totals into an array to be sorted
    const campaigns = Object.keys(donationTracker);
    const totalTracker = [];
    campaigns.forEach((c) => {
      totalTracker.push({
        campaignID: c,
        total: donationTracker[c],
      });
    });
    // sort the campaigns by who got the most donations in the last day.
    totalTracker.sort((c1, c2) => {
      return c1.total - c2.total;
    });
    const result = [];
    for (let i = 0; i < 5; i++) {
      const best = totalTracker.pop();
      if (best) {
        const campaign = await PublishedCampaign.findById(best.campaignID);
        result.push(campaign);
      } else {
        break;
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get Search Options
router.get("/searchOptions", async (req, res) => {
  try {
    const result = await PublishedCampaign.aggregate().project({ title: 1, subtitle: 1, description: 1 });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/***** FOR SETTINGS *****/

/* Edit Published Settings */
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
    // update unpublished campaign
    const c = res.campaign;
    c.title = b.title;
    c.subtitle = b.subtitle;
    c.description = b.description;
    if (b.mainImage) {
      c.mainImage = b.mainImage;
    }

    // respond with new data
    const updatedPC = await c.save();
    return res.json(updatedPC);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/***** FOR EDIT CONTENT *****/

/* Edit Published Content */
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
    const updatedPC = await res.campaign.save();
    return res.json(updatedPC);
  } catch {
    return res.status(500).json({ message: error.message });
  }
});

/*********************** FOR DEBUGGING ********************************/

/* GET all campaigns. FOR DEBUGGING PURPOSES ONLY */
// currently it returns all the campaigns in the campaign db.
router.get("/", async (req, res) => {
  try {
    // Campaign.deleteMany();
    const campaigns = await PublishedCampaign.find();
    return res.json(campaigns);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/* GET a specific campaign listing by id. FOR DEBUGGING PURPOSES ONLY */
router.get("/:campaignID", getCampaign, function (req, res) {
  return res.json(res.campaign);
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
    return res.json(updatedCampaign);
  } catch (error) {
    return res.status(400).json({ message: error.message });
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

const ValidContentTypes = {
  Header: true,
  Paragraph: true,
  Image: true,
  Video: true,
};
