import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersCtrl.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUserById);
router.get("/", verifyAdmin, getAllUsers);

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Heelo user, u can elete");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Heelo admin");
// });
export default router;
