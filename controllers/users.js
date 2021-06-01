import User from "../model/User.js";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
import auth from '../middleware/auth.js';


export const register = ([
check('name', 'Name is requird').not().isEmpty(),

], async(req, res) => {
res.send('Register user');

});
