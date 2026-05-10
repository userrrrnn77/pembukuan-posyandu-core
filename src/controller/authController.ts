import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { logger } from "../utils/logger.js";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

// --- AUTH CORE ---

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullname, phone, password } = req.body;
    const userExists = await User.findOne({ phone });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Nomor HP ini sudah terdaftar, Bre!" });
    }

    const user = await User.create({ fullname, phone, password });

    if (user) {
      const token = generateToken(user._id.toString());
      res.cookie("token", token, {
        httpOnly: true,
        // ⚡ Kunci utamanya di sini bre:
        secure: true, // WAJIB true kalau sameSite 'none'
        sameSite: "none", // Izinkan lintas domain (Netlify <-> Vercel)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/", // Pastiin tersedia di semua path api
      });

      logger.info(`✅ Admin Baru: ${fullname} terdaftar.`);
      res.status(201).json({
        id: user._id,
        fullname,
        phone,
        message: "Gas, akun admin jadi!",
      });
    }
  } catch (error: any) {
    logger.error(`❌ Register Error: ${error.message}`);
    res.status(500).json({ message: "Server pening pas register!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id.toString());

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      console.log("SET COOKIE:");
      console.log(res.getHeader("set-cookie"));

      res.json({
        id: user._id,
        fullname: user.fullname,
        phone: user.phone,
        message: "Login aman!",
      });
    } else {
      res.status(401).json({ message: "Nomor HP atau Password salah, Bre!" });
    }
  } catch (error: any) {
    logger.error(`❌ Login Error: ${error.message}`);
    res.status(500).json({ message: "Gagal login, coba lagi ntar!" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  logger.info("👋 User logout.");
  res.json({ message: "Logout sukses!" });
};

// --- USER MANAGEMENT (CRUD ADMIN) ---

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Ambil semua kecuali password, biar aman
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Gagal narik data semua user!" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User kaga ketemu!" });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: "ID User kaga valid!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullname, phone, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User kaga ada!" });

    // Update manual biar pre-save hook buat password tetep jalan kalo ada password baru
    if (fullname) user.fullname = fullname;
    if (phone) user.phone = phone;
    if (password) user.password = password;

    const updatedUser = await user.save();

    logger.info(`🔄 User ${updatedUser.fullname} diupdate.`);
    res.json({
      id: updatedUser._id,
      fullname: updatedUser.fullname,
      phone: updatedUser.phone,
      message: "Data user berhasil diperbarui!",
    });
  } catch (error: any) {
    logger.error(`❌ Update User Error: ${error.message}`);
    res.status(400).json({
      message: "Gagal update user, mungkin nomor HP udah dipake orang lain!",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User emang udah kaga ada!" });

    logger.info(`🗑️ User dihapus: ${user.fullname}`);
    res.json({ message: "User berhasil diblokir dari dunia persilatan!" });
  } catch (error: any) {
    res.status(400).json({ message: "Gagal hapus user!" });
  }
};
