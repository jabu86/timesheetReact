import express from "express";
import TimeCard from "../../model/TimeCard.js";
import { check, validationResult } from "express-validator";
import User from "../../model/User.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

///@route   GET    /api/monday
//@desc     Get user timecards i.e hours employee worked for that day
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const timecard = TimeCard.findById({ _id: req.params.id });
    return timecard.map((mon_time) => res.json(mon_time.monday));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

///@route   POST    /api/monday/:id
//@desc     Add monday hours to timecard
//@access   Private
router.post(
  "/:id",
  auth,
  [
    check("hours", "Hours worked on a task required").not().isEmpty(),
    check("description", "Describe what you worked on a task is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { hours, description } = req.body;
    try {
      const timecard = await TimeCard.findOne({ _id: req.params.id });

      if (timecard.user.toString() !== req.user.id) {
        res.status(400).json({ msg: "User not autorized" });
      } else {
        const mondayTime = {
          hours,
          description,
        };
        timecard.monday.unshift(mondayTime);
        await timecard.save();
        res.status(200).json(timecard.monday);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

///@route   POST    /api/monday
//@desc     Update monday hours to timecard
//@access   Private
router.put(
  "/:id/:mon_id",
  auth,
  [
    check("hours", "hours worked on a task required").not().isEmpty(),
    check("description", "Describe what you worked on a task is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { hours, description } = req.body;
    try {
      const timecard = await TimeCard.findOne({ _id: req.params.id });
      if (timecard.user.toString() !== req.user.id) {
        res.status(404).json({ msg: "User not autorized" });
      } else {
        const update = {
          $set: {
            "monday.$.hours": hours,
            "monday.$.description": description,
          },
        };
        await TimeCard.updateOne(
          {
            _id: req.params.id,
            "monday._id": req.params.mon_id,
          },
          update,
          (err, respond) => {
            if (err) return console.log(err);
            res.json(timecard.monday);
            console.log(respond);
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE    /api/monday
//@desc     Delte experience from profile
//@access   Private
router.delete("/:id/:mon_id", auth, async (req, res) => {
  try {
    const timecard = await TimeCard.findById({ _id: req.params.id });
    //Pull out monday
    const monday = timecard.monday.find(
      (monday) => monday.id === req.params.mon_id
    );

    if (!monday) {
      return res.status(404).json({ msg: "Monday tasks does not exist" });
    }
    //Check user
    if (timecard.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "User not autorized" });
    }
      //Get remove index
      const removeIndex = timecard.monday
        .map((item) => item.id)
        .indexOf(req.params.mon_id);
      timecard.monday.splice(removeIndex, 1);
      await timecard.save();
      res.json(timecard.monday);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
