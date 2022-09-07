import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getHotels,
  countByCity,
  countByType,
} from "../controllers/hotelCtrl.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.put("/find/:id", verifyAdmin, updateHotel);
router.delete("/find/:id", verifyAdmin, deleteHotel);
router.get("/find/:id", getHotelById);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
