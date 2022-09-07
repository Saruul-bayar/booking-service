import express from "express";
import {
  getAllRooms,
  getRoomById,
  updateRoom,
  createRoom,
  deleteRoom,
} from "../controllers/roomCtrl.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/:id", getRoomById);
router.get("/", getAllRooms);

// router.get("/checkRoom/:id", verifyRoom, (req, res, next) => {
//   res.send("Heelo Room, u can elete");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Heelo admin");
// });
export default router;
