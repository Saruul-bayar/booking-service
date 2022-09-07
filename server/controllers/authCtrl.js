import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  console.log(req.body.password);
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      const err = new Error();
      err.status = 400;
      err.message = "USER NOT FOUND!";
      return next(err);
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPassCorrect) {
      const err = new Error();
      err.status = 400;
      err.message = "Wrong password or username!";
      return next(err);
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(otherDetails);
  } catch (error) {
    next(error);
  }
};
