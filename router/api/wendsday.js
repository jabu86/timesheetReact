import express from "express";
import TimeCard from "../../model/TimeCard.js";
import { check, validationResult } from "express-validator";
import User from "../../model/User.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

///@route   GET    /api/wendsday
//@desc     Get user timecards i.e hours employee worked for that day
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const timecard = TimeCard.findById({ _id: req.params.id });
    return timecard.map((wendsday) => res.json(wendsday.wendsday));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

///@route   POST    /api/wendsday
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
        res.status(404).json({ msg: "User not autorized" });
      } else {
        const wendsdayTime = {
          hours,
          description,
        };
        timecard.wendsday.unshift(wendsdayTime);
        await timecard.save();
        res.status(200).json(timecard.wendsday);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

///@route   POST    /api/wendsday
//@desc     Update wendsday hours to timecard
//@access   Private
router.put(
  "/:id/:wend_id",
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

        const update ={$set :{
            "wendsday.$.hours" : hours,
            "wendsday.$.description" : description
            }
        };
        await TimeCard.updateOne({
            _id: req.params.id,
            "wendsday._id": req.params.wend_id
        }, update, (err, respond) => {
            if(err) return console.log(err);
            res.json(timecard.wendsday);
            console.log(respond);
        });


      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE    /api/wendsday
//@desc     Delte experience from profile
//@access   Private
router.delete("/:id/:wend_id", auth, async (req, res) => {
  try {
    const timecard = await TimeCard.findOne({ _id: req.params.id });

    if (timecard.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "User not autorized" });
    } else {
      //Get remove index
      const removeIndex = timecard.wendsday
        .map((item) => item.id)
        .indexOf(req.params.wend_id);
      timecard.wendsday.splice(removeIndex, 1);
      await timecard.save();
      res.status(200).json(timecard.wendsday);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
