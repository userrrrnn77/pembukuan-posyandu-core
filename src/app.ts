// src/app.ts

import express, {
  type NextFunction,
  type Response,
  type Request,
} from "express";
import mainRoutes from "./routes/_routes.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(morgan("dev"));

const allowedOrigins = [
  "https://posyandu-kuncup-harapan.netlify.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.1.3:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Gak diizinin CORS sama Arsitek, bre!"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // WAJIB TRUE kalo pake Cookie-Parser / Session
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("ORIGIN:", req.headers.origin);
  console.log("COOKIE HEADER:", req.headers.cookie);
  next();
});

app.use("/api", mainRoutes);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} Tidak Ditemukan, jangan ngasal bre!`,
  });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error("🚨 SERVER ERROR:", err.stack);
    return res.status(500).json({
      success: false,
      message: `Terjadi Kesalahan Pada Internal Server`,
      error: process.env.NODE_ENV === "development" ? err.message : null,
    });
  }

  console.error("🚨 GHOIB ERROR:", err);
  return res.status(500).json({
    success: false,
    message: "Anjir, ada error ghoib bre!",
    error: process.env.NODE_ENV === "development" ? err : null,
  });
});

export default app;
