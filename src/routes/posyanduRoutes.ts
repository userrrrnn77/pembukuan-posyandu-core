import { Router } from "express";
import {
  tambahBalita,
  ambilSemuaBalita,
  updateBalita,
  hapusBalita,
  tambahLansia,
  ambilSemuaLansia,
  updateLansia,
  hapusLansia,
} from "../controller/posyanduController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Semua route di sini kita kasih 'protect' di depan controllernya
// CRUD Balita
router.post("/balita", protect, tambahBalita);
router.get("/balita", protect, ambilSemuaBalita);
router.put("/balita/:id", protect, updateBalita);
router.delete("/balita/:id", protect, hapusBalita);

// CRUD Lansia
router.post("/lansia", protect, tambahLansia);
router.get("/lansia", protect, ambilSemuaLansia);
router.put("/lansia/:id", protect, updateLansia);
router.delete("/lansia/:id", protect, hapusLansia);

export default router;
