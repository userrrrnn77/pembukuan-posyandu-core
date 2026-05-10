import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Public Routes (Siapapun bisa akses buat masuk)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Private Routes (Cuma yang punya cookie token valid yang bisa akses)
router.get("/users", protect, getAllUsers);
router.get("/users/:id", protect, getUserById);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;
