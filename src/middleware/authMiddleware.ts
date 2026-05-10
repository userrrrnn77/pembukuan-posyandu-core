import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logger } from "../utils/logger.js";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Ambil token dari cookie, bukan dari Headers lagi!

  console.log("COOKIES MASUK:");
  console.log(req.cookies);

  console.log("TOKEN:");
  console.log(req.cookies.token);

  const token = req.cookies.token;

  if (!token) {
    logger.warn("⚠️ Akses ditolak: Token gak nemu di cookie!");
    return res
      .status(401)
      .json({ message: "Login dulu lah Bre, jangan nyelonong!" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Cari usernya di DB, tapi jangan bawa password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User di token ini udah kaga ada di Mabes!" });
    }

    // Masukin data user ke object request biar bisa dipake di controller selanjutnya
    (req as any).user = user;

    next();
  } catch (error) {
    logger.error("❌ Token invalid atau expired!");
    res.status(401).json({ message: "Token lu busuk Bre, login ulang sana!" });
  }
};
