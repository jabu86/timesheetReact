import express from "express";
import TimeCard from "../../model/TimeCard.js";
import { check, validationResult } from "express-validator";
import User from "../../model/User.js";
import Notification from "../../model/Notifications.js";
import auth from "../../middleware/auth.js";
const router = express.Router();
//import {addTimeCard} from '../../controllers/timecards.js';

//@route    GET     /api/timecards
//@desc     Get all timecards
//@access   Public
router.get("/", async (req, res) => {
  try {
    const timecards = await TimeCard.find()
      .sort({ createdAt: -1 })
      .populate("user", ["name", "image"]);
    if (!timecards) {
      res.status(404).json({ msg: "There are no timecards" });
    }
    res.json(timecards);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    GET     /api/timecards/user/:user_id
//@desc     Get all timecards for a user
//@access   Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const timecards = await TimeCard.find({
      user: req.params.user_id,
    })
      .sort({ createdAt: -1 })
      .populate("user", ["name", "image"]);
    if (!timecards) {
      res.status(404).json({ msg: "There are no timecards" });
    }
    res.status(200).json(timecards);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    GET      /api/timecards/notification/:user_id
//@desc     Get user notifications
//@access   Private
router.get("/notification/:user_id", auth, async (req, res) => {
  try {
    const notification = await Notification.find({
      user: req.params.user_id,
    })
      .sort({ createdAt: -1 })
      .populate("user", ["name", "image"]);
    if (!notification) {
      res.status(404).json({ msg: "No notifications" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    GET     /api/timecards/:id
//@desc     Get single timecards
//@access   Public
router.get("/:id", async (req, res) => {
  try {
    const timecards = await TimeCard.findById({
      _id: req.params.id,
    }).populate("user", ["name", "image"]);
    if (!timecards) {
      res.status(404).json({ msg: "There are no timecards" });
    }
    res.json(timecards);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    PUT    /api/timecards/:id
//@desc     Update  timecards
//@access   Private
router.put(
  "/:id",
  auth,
  [
    check("project", "Name of the project is required").not().isEmpty(),
    check("company", "Company name is required").not().isEmpty(),
    check("from", "The date week when you started is required").not().isEmpty(),
    check("to", "The date week when you ended is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, project, from, to, description } = req.body;
    try {
      const timecard = await TimeCard.findById({ _id: req.params.id });
      if (timecard.user.toString() !== req.user.id) {
        res
          .status(404)
          .json({ msg: "User not authorized to update timecard." });
      } else {
        timecard.company = company;
        timecard.project = project;
        timecard.from = from;
        timecard.to = to;
        timecard.description = description;
        await timecard.save();
        const newTime = await TimeCard.findOne({
          _id: timecard._id,
        }).populate("user", ["name", "image"]);
        res.status(200).json(newTime);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    POST     /api/timecards
//@desc     Create a timecard for a user
//@access   Private
router.post(
  "/",
  auth,
  [
    check("project", "Name of the project is required").not().isEmpty(),
    check("company", "Company name is required").not().isEmpty(),
    check("from", "The date week when you started is required").not().isEmpty(),
    check("to", "The date week when you ended is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, project, from, to, description } = req.body;
    try {
      //Check user
      //get the user name  of User = user.name
      const user = await User.findById(req.user.id).select("-password");
      if (user) {
        const timecard = await new TimeCard({
          name: user.name,
          company,
          project,
          from,
          to,
          description,
          user: req.user.id,
        });
        await timecard.save();
        const newTime = await TimeCard.findOne({
          _id: timecard._id,
        }).populate("user", ["name", "image"]);

        res.status(200).json(newTime);
      } else {
        res.status(404).json({ msg: "User not allowed to create timecard." });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

///@route   DELETE    /api/timecards/:id
//@desc     Delete user timecards
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const timecard = await TimeCard.findById({ _id: req.params.id });
    if (timecard.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "User not authorized to delete timecard." });
    } else {
      await timecard.delete();
      res.status(200).json({ msg: "Timecard Removed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    PUT    /api/timecards/approve:id
//@desc     Update status true  timecards
//@access   Private
router.put("/approve/:id", auth, async (req, res) => {
  const { status, total } = req.body;

  try {
    //Get the logged in user
    const userLoggedIn = await User.findById({ _id: req.user.id });
    //Check if user is admin or manager
    if (userLoggedIn.role !== "admin" && userLoggedIn.role !== "manager") {
      return res.status(400).json({ errors: [{ msg: "Not authorized." }] });
    }
    //Set status true
    const timecard = await TimeCard.findById({ _id: req.params.id });
    timecard.status = Boolean(status);
    timecard.total_hours = total;
    //Notifications
    const notification = await new Notification({
      timcard: timecard._id,
      user: timecard.user,
      message: "Timcard has been approved",
    });
    await timecard.save();
    await notification.save();
    const newTime = await TimeCard.findOne({
      _id: timecard._id,
    }).populate("user", ["name", "image"]);
    res.status(200).json(newTime);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@route    DELETE     /api/timecards/notification/:id
//@desc     Get single timecards
//@access   Public
router.delete("/notification/:id", auth, async (req, res) => {
  try {
    const notification = await Notification.findById({
      _id: req.params.id,
    });
    if (!notification) {
      res.status(404).json({ msg: "There are no notifications" });
    }
    await notification.delete();
    res.status(200).json({ msg: "Notification" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
