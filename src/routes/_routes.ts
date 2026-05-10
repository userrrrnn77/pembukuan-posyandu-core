// src/routes/_routes.ts

import { Router } from "express";
import posyanduRoutes from "./posyanduRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posyandu", posyanduRoutes);

export default router;
