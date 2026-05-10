import mongoose from "mongoose";
import User from "./src/models/User.js"; // Sesuaikan path model lu bre
import "dotenv/config"; // Biar bisa baca DATABASE_URL

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://posyandu:Rendyagus2004@posyandu.89je6tz.mongodb.net/Posyandu?appName=Posyandu";

const seedUser = async () => {
  try {
    console.log("🚀 Memulai proses seeding Adamantium...");
    
    // 1. Koneksi ke DB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Koneksi database berhasil!");

    // 2. Bersihin data lama (Opsional, tapi biar gak duplikat phone)
    await User.deleteMany({});
    console.log("🧹 Data user lama sudah dibersihkan.");

    // 3. Data Admin buat login pertama kali
    const adminData = {
      fullname: "Admin Arsitek Titanium",
      phone: "081234567890", // Ini buat login ntar
      password: "password123", // Tenang bre, bakal otomatis ter-hash oleh schema.pre("save")
    };

    // 4. Eksekusi save
    const newUser = new User(adminData);
    await newUser.save();

    console.log("---");
    console.log("🔥 SEEDING BERHASIL!");
    console.log(`👤 Name: ${adminData.fullname}`);
    console.log(`📱 Phone: ${adminData.phone}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log("---");

  } catch (error) {
    console.error("❌ Seeding gagal, Bre!", error);
  } finally {
    // 5. Putus koneksi biar script kelar
    await mongoose.disconnect();
    process.exit();
  }
};

seedUser();