import express from "express";
import auth from "../../middleware/auth.js";
const router = express.Router();
import Profile from "../../model/Profile.js";
import { check, checkSchema, validationResult } from "express-validator";
import User from "../../model/User.js";
import TimeCard from "../../model/TimeCard.js";
import path from "path";
const __dirname = path.resolve();

//@route    GET     /api/profile/me
//@desc     Get current user profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "image"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    GET     /api/profile/
//@desc     Get all users profile
//@access   Public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "image"]);
    if (!profile) {
      res.status(404).json({ msg: "There are no profiles" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET     /api/profile/user/:user_id
//@desc     Get users profile
//@access   Private
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "image"]);
    if (!profile) {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    POST    /api/profile/experience
//@desc     Add experience to profile
//@access   Private
router.post(
  "/experience",
  auth,
  [
    check("title", "Job title is required").not().isEmpty(),
    check("company", "Company name is required").not().isEmpty(),
    check("from", "Date from when you begain working for a company is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      title,
      from,
      description,
      current,
      to,
      location,
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const newExp = {
        company,
        title,
        from,
        description,
        current,
        to,
        location,
      };
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    POST    /api/profile/education
//@desc     Add education to profile
//@access   Private
router.post(
  "/education",
  auth,
  [
    check(
      "school",
      "The name of the school we're you studed or study is required"
    )
      .not()
      .isEmpty(),
    check("degree", "The name of the degree/diploma you hold is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "What did you study is required?").not().isEmpty(),
    check("from", "The date you begain your'r studies is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      current,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      description,
      current,
      to,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();
      res.status(200).json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE    /api/profile/experience/exp_id
//@desc     Delte experience from profile
//@access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE    /api/profile/education/exp_id
//@desc     Delete education from profile
//@access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE    /api/profile/
//@desc     Delte profile, users & post
//@access   Private
router.delete("/", auth, async (req, res) => {
  try {
    //remove user timecards
    await TimeCard.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json({ msg: "User Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//@route    POST     /api/profile/upload
//@desc     Upload user profile image
//@access   Private
router.post("/upload", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    //return console.log(user);
    if (user.id == req.user.id) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({
            msg: "No file uploaded!  Please select an user profile image.",
          });
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const file = req.files.file;
      file.mv(`${__dirname}/client/public/images/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        //Update profile image
        user.image = "/images/" + file.name;
        await user.save();
        res.status(200).json({
          msg: "File upload success",
          fileName: file.name,
          filePath: `/images/${file.name}`,
        });
      });
    } else {
      return res.status(404).json({ msg: "Unauthorized user" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//@route    POST     /api/profile/
//@desc     Create or update user profile
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, status, skills, bio } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      } else {
        //Create Profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
