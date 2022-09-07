import RoomModel from "../models/Room.js";
import HotelModel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
// UPDATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new RoomModel(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;

  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET
export const getRoomById = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL RoomS
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};
