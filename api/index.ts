import "dotenv/config";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import type { Request, Response } from "express";

let isConnected = false;

export default async function handler(req: Request, res: Response) {
  console.log("RUNNING NEW BUILD 🚀");

  try {
    if (!isConnected) {
      console.log("⏳ Connecting MongoDB...");
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB Connected!");
    }

    return app(req, res);
  } catch (error: any) {
    console.error("🚨 Handler Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
}
