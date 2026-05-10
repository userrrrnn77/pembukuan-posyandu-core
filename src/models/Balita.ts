import mongoose, { Schema, Document, Model } from "mongoose";

export interface Antropometri {
  beratBadan: number;
  tinggiBadan: number;
  lingkarLenganAtas: number;
  lingkarKepala: number;
}

export interface IBalita extends Document {
  nomorIndukKependudukan?: string;
  namaBalita: string;
  namaOrangTua: string;
  anakKe: number;
  jenisKelamin: "Laki-laki" | "Perempuan";
  alamatLengkap: string;
  rukunTetangga: string;
  tanggalLahir: Date;
  antropometri: Antropometri;
  keterangan?: string;
}

const balitaSchema = new Schema<IBalita>(
  {
    nomorIndukKependudukan: { type: String, required: false },
    namaBalita: { type: String, required: true },
    namaOrangTua: { type: String, required: true },
    anakKe: { type: Number, required: true },
    jenisKelamin: {
      type: String,
      enum: ["Laki-laki", "Perempuan"],
      required: true,
    },
    alamatLengkap: { type: String, required: true },
    rukunTetangga: { type: String, required: true },
    tanggalLahir: { type: Date, required: true },
    antropometri: {
      beratBadan: { type: Number, required: true },
      tinggiBadan: { type: Number, required: true },
      lingkarLenganAtas: { type: Number, required: true },
      lingkarKepala: { type: Number, required: true },
    },
    keterangan: { type: String },
  },
  { timestamps: true, versionKey: false },
);

const Balita =
  (mongoose.models.Balita as Model<IBalita>) ||
  mongoose.model<IBalita>("Balita", balitaSchema);

export default Balita;
