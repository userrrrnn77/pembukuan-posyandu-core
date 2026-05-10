# 🚀 Backend Posyandu USM Core

> **The high-performance powerhouse behind Mabes Posyandu.** > Built with a focus on resource efficiency, strict type-safety, and rapid data processing using the Bun runtime.

---

## 🛠️ Adamantium Tech Stack

* **Runtime:** [Bun](https://bun.sh/) (Optimized for extreme speed)
* **Framework:** Express.js with TypeScript
* **Database:** MongoDB via Mongoose ODM
* **Security:** JWT (JSON Web Tokens) & HTTP-Only Cookie Authentication
* **Logging:** Pino & Pino-Pretty (High-performance structured logging)
* **Resource Management:** Systemd-run with CPU & Memory Quotas

---

## 📂 Project Structure

```text
.
├── api/                # Serverless entry for Vercel deployment
├── src/
│   ├── config/         # Database connection & env configurations
│   ├── controller/     # Logic handlers (Auth, Balita & Lansia)
│   ├── middleware/     # Security guards (JWT Verification)
│   ├── models/         # Mongoose Adamantium Schemas
│   ├── routes/         # Express Route definitions
│   └── utils/          # Logger & shared helper functions
├── testing.ts          # Main development entry point
└── seedUser.ts         # Initial database seeding script