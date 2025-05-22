var express = require("express");
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
var path = require("path");

// mongoose models
const Image = require("../models/image");
const UnpublishedCampaign = require("../models/unpublishedCampaign");
const PublishedCampaign = require("../models/publishedCampaign");

// for storing images to disk before re-retrieving them to be put into mongo

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, "temp.png");
  },
});

var upload = multer({ storage: storage });

/* POST new Image */
router.post("/", upload.single("image"), (req, res) => {
  const obj = {
    content: {
      data: fs.readFileSync(path.join(__dirname + "/../public/images/" + req.file.filename)),
      contentType: "image/png",
    },
  };
  Image.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else {
      // item.save();
      // res.redirect("/");
      // res.status(201);
      return res.status(201).send(item._id);
    }
  });
});

/* GET Image */
router.get("/:imageID", getImage, async function (req, res) {
  res.status(200);
  res.contentType("json");
  res.send(res.image.content);
});

/* DELETE Image */
// used for when replacing an image during saving.
// the given image must NOT already be in use for another object (like a campaign for example)
router.delete("/:imageID", getImage, async function (req, res) {
  // middleware found Image
  try {
    if (req.params.imageID == "638ae54cd4f54a8e23b56c4e") {
      // this is the default image. we NEVER EVER WANT TO DELETE THIS.
      return res.status(401).json({ message: "You cannot delete this image" }); // Forbidden
    }
    const unpublishedVictim = await UnpublishedCampaign.find({ mainImage: res.image._id });
    const publishedVictim = await PublishedCampaign.find({ mainImage: res.image._id });
    if (unpublishedVictim.length > 0 || publishedVictim.length > 0) {
      return res.status(403).json({ message: "Access Forbidden, this image cannot be deleted. It is in use." }); // Access Forbidden
    }
    // preconditions checked, start deletion.

    // delete all unpublished campaigns
    await res.image.remove();
    return res.status(200).json({ message: "Deleted Image" }); // OK
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/***** DEBUG ONLY *****/

/* GET ALL Images (FOR DEBUG ONLY) */
router.get("/", async function (req, res) {
  await createDefaultIfEmpty();
  const result = await Image.find();
  const newResult = result.map((res) => {
    return res._id;
  });
  res.json(newResult);
});

// deletes all unused images. Before running this make sure to USE THE DEFAULT IMAGE OR IT WILL BE DELETED AND FUCK EVERYTHING UP.
router.delete("/", async function (req, res) {
  try {
    const images = await Image.find();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image._id == "638ae54cd4f54a8e23b56c4e") {
        continue; // this is the default image. we literally NEVER want to remove this. EVER.
      }
      const unpublishedVictim = await UnpublishedCampaign.find({ mainImage: image._id });
      const publishedVictim = await PublishedCampaign.find({ mainImage: image._id });
      const unpublishedContentVictim = await UnpublishedCampaign.find({ $expr: { $in: [image._id, "$content.content"] } });
      const publishedContentVictim = await PublishedCampaign.find({ $expr: { $in: [image._id, "$content.content"] } });
      console.log(unpublishedContentVictim[0] ? unpublishedContentVictim[0].title : "");
      console.log(publishedContentVictim[0] ? publishedContentVictim[0].title : "");
      if (unpublishedVictim.length == 0 && publishedVictim.length == 0 && unpublishedContentVictim.length == 0 && publishedContentVictim.length == 0) {
        await image.remove();
      }
    }
    return res.status(200).json({ message: "Deleted All Unused Images" }); // OK
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Helper functions

async function createDefaultIfEmpty() {
  const dbContents = await Image.find();
  if (dbContents.length == 0) {
    var a = new Image();
    a.content.data = fs.readFileSync(__dirname + "/../public/images/DefaultCampaign.png");
    a.content.contentType = "image/png";
    await a.save();
  }
}

/**
 * This is a middleware function that is to be used whenever we expect an imageID from the client
 * We search the database for a user with the given id.
 * If something random goes wrong, return status 500
 * If we cannot find a matching user, return status 404
 */
async function getImage(req, res, next) {
  let image;
  try {
    image = await Image.findById(req.params.imageID);
    if (image == null) {
      return res.status(404).json({ message: "Cannot find image" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.image = image;
  next();
}

module.exports = router;
