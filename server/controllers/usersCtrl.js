import UserModel from "../models/User.js";

// UPDATE
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET
export const getUserById = async (req, res) => {
  try {
    const User = await UserModel.findById(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
