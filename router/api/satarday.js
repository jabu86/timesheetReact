import express from "express";
import TimeCard from "../../model/TimeCard.js";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth.js";

const router = express.Router();

///@route   GET    /api/satarday
//@desc     Get user timecards i.e hours employee worked for that day
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const timecard = TimeCard.findById({ _id: req.params.id });
    return timecard.map((day) => res.json(day.satarday));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

///@route   POST    /api/satarday
//@desc     Add satarday hours to timecard
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
        res.status(404).json({ msg: "User not autorized" });
      } else {
        const satData = {
          hours,
          description,
        };
        timecard.satarday.unshift(satData);
        await timecard.save();
        res.status(200).json(timecard.satarday);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

///@route   PUT    /api/satarday
//@desc     Update satarday hours to timecard
//@access   Private
router.put(
  "/:id/:sat_id",
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
            "satarday.$.hours": hours,
            "satarday.$.description": description,
          },
        };
        await TimeCard.updateOne(
          {
            _id: req.params.id,
            "satarday._id": req.params.sat_id,
          },
          update,
          (err, respond) => {
            if (err) return console.log(err);
            res.json(timecard.satarday);
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

//@route    DELETE    /api/satarday
//@desc     Delete satarday timecard
//@access   Private
router.delete("/:id/:sat_id", auth, async (req, res) => {
  try {
    const timecard = await TimeCard.findById({ _id: req.params.id });
    if (timecard.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "User not autorized" });
    } else {
      //Get remove index
      const removeIndex = timecard.satarday
        .map((item) => item.id)
        .indexOf(req.params.sat_id);
      timecard.satarday.splice(removeIndex, 1);
      await timecard.save();
      res.status(200).json(timecard.satarday);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
