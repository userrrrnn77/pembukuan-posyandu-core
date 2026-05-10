import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILansia extends Document {
  nomorIndukKependudukan: string;
  namaLengkapLansia: string;
  alamatLengkapDomisili: string;
  rukunTetangga: string;
  tanggalLahirLansia: Date;
  beratBadanKilogram: number;
  tinggiBadanSentimeter: number;
  tekananDarahSistolikDiastolik: string;
  kadarGulaDarahSewaktuMgdl: number;
  kadarAsamUratDarahMgdl: number;
  kadarKolesterolTotalMgdl: number;
  catatanKesehatanTambahan?: string;
  tanggalPemeriksaan: Date;
}

const lansiaSchema = new Schema<ILansia>(
  {
    nomorIndukKependudukan: {
      type: String,
      required: true,
      trim: true,
    },
    namaLengkapLansia: {
      type: String,
      required: true,
    },
    alamatLengkapDomisili: {
      type: String,
      required: true,
    },
    rukunTetangga: {
      type: String,
      required: true,
    },
    tanggalLahirLansia: {
      type: Date,
      required: true,
    },
    beratBadanKilogram: {
      type: Number,
      required: true,
    },
    tinggiBadanSentimeter: {
      type: Number,
      required: true,
    },
    tekananDarahSistolikDiastolik: {
      type: String,
      required: true,
    },
    kadarGulaDarahSewaktuMgdl: {
      type: Number,
      default: 0,
    },
    kadarAsamUratDarahMgdl: {
      type: Number,
      default: 0,
    },
    kadarKolesterolTotalMgdl: {
      type: Number,
      default: 0,
    },
    catatanKesehatanTambahan: {
      type: String,
    },
    tanggalPemeriksaan: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Lansia =
  (mongoose.models.Lansia as Model<ILansia>) ||
  mongoose.model<ILansia>("Lansia", lansiaSchema);

export default Lansia;
