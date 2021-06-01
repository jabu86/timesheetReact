import express from "express";
import { check, validationResult } from "express-validator";
import User from "../../model/User.js";
import auth from "../../middleware/auth.js";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
const router = express.Router();

//@route    POST     api/users
//@desc     Register user
//@access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "E-mail address is required").not().isEmpty(),
    check("email", "Not valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });
      //Get users
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User name already taken" }] });
      }
      //Create User
      user = new User({
        name,
        email,
        password,
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //Return Jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);

//@route    POST     api/users/login
//@desc     Authenticate user & Get token
//@access   Public
router.post(
  "/login",
  [
    check("email", "E-mail address is required.").not().isEmpty(),
    check("email", "E-mail address is not valid.").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });
      //Get users
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid crdentials." }] });
      }
      //Compare Encrypt password
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid crdentials." }] });
      }

      //Return Jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);

//@route    GET     api/users/
//@desc     Get users
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    //See if user exists
    let user = await User.find().sort({ createdAt: -1 }).select("-password");
    //Get users
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Users not found." }] });
    }
    //@todo check user role
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

//@route    PUT     api/users/
//@desc     Update Authenticate user role
//@access   Private
router.put(
  "/:id",
  [check("role", "Role is required.").not().isEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { role } = req.body;
    try {
      //Get the logged in user
      const userLoggedIn = await User.findById({ _id: req.user.id });
      //Check if user is admin or manager
      if (userLoggedIn.role !== "admin" && userLoggedIn.role !== "manager") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Not allowed to assign roles." }] });
      }
      //See if user exists
      let user = await User.findById({ _id: req.params.id }).select(
        "-password"
      );
      //Get users
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Users not found." }] });
      }
      user.role = role;
      user.save();
      //@todo check user role
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);
export default router;
