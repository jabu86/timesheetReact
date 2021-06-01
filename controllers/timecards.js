import TimeCard from "../model/TimeCard.js";
import { check, validationResult } from "express-validator";
import User from "../model/User.js";
/**
*
*Validate timecard
Creat new Timecard
*@returns Object
**/
export const addTimeCard =
  ([
    check("project", "Name of the project is required").not().isEmpty(),
    check("comapnay", "Company name is required").not().isEmpty(),
    check("from", "The date week when you started is required").not().isEmpty(),
    check("to", "The date week when you ended is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    res.send('test');
    return false;
    const {company, project, from, to, description } = req.body;
    try {
      const timecard = await new TimeCard({
        name : req.user.name,
        company,
        project,
        from,
        to,
        description,
        user: req.user.id,
      });

      await timecard.save();
      res.status(200).json(timecard);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  });
