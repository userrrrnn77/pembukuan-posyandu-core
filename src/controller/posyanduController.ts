// src/controller/posyanduController.ts

import { Request, Response } from "express";
import Balita from "../models/Balita.js";
import Lansia from "../models/Lansia.js";
import { logger } from "../utils/logger.js";

// --- CONTROLLER BALITA ---

export const tambahBalita = async (req: Request, res: Response) => {
  try {
    const dataBaru = await Balita.create(req.body);
    logger.info(`👶 Data Balita baru ditambahkan: ${dataBaru.namaBalita}`);
    res.status(201).json(dataBaru);
  } catch (error: any) {
    logger.error(`❌ Gagal tambah Balita: ${error.message}`);
    res
      .status(400)
      .json({ message: "Gagal input data balita, cek lagi inputannya Bre!" });
  }
};

export const ambilSemuaBalita = async (req: Request, res: Response) => {
  try {
    const data = await Balita.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: "Server pening pas ambil data balita!" });
  }
};

export const updateBalita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Proteksi Overkill: Hapus field yang dilarang update
    delete updateData.nomorIndukKependudukan;
    delete updateData.namaBalita;

    const dataUpdated = await Balita.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!dataUpdated)
      return res.status(404).json({ message: "Balitanya gak ketemu, Bre!" });

    logger.info(`🔄 Data Balita updated: ${dataUpdated.namaBalita}`);
    res.json(dataUpdated);
  } catch (error: any) {
    res.status(400).json({ message: "Gagal update, mungkin ID salah!" });
  }
};

export const hapusBalita = async (req: Request, res: Response) => {
  try {
    await Balita.findByIdAndDelete(req.params.id);
    res.json({ message: "Data balita berhasil dibuang ke tong sampah!" });
  } catch (error: any) {
    res.status(400).json({ message: "Gagal hapus data!" });
  }
};

// --- CONTROLLER LANSIA ---

export const tambahLansia = async (req: Request, res: Response) => {
  try {
    const dataBaru = await Lansia.create(req.body);
    logger.info(
      `👴 Data Lansia baru ditambahkan: ${dataBaru.namaLengkapLansia}`,
    );
    res.status(201).json(dataBaru);
  } catch (error: any) {
    logger.error(`❌ Gagal tambah Lansia: ${error.message}`);
    res
      .status(400)
      .json({ message: "Gagal input data lansia, jangan typo Bre!" });
  }
};

export const ambilSemuaLansia = async (req: Request, res: Response) => {
  try {
    const data = await Lansia.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: "Server pening pas ambil data lansia!" });
  }
};

export const updateLansia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Proteksi Overkill: NIK dan Nama dilarang ganti!
    delete updateData.nomorIndukKependudukan;
    delete updateData.namaLengkapLansia;

    const dataUpdated = await Lansia.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!dataUpdated)
      return res.status(404).json({ message: "Lansia gak ketemu!" });

    logger.info(`🔄 Data Lansia updated: ${dataUpdated.namaLengkapLansia}`);
    res.json(dataUpdated);
  } catch (error: any) {
    res.status(400).json({ message: "Gagal update data lansia!" });
  }
};

export const hapusLansia = async (req: Request, res: Response) => {
  try {
    await Lansia.findByIdAndDelete(req.params.id);
    res.json({ message: "Data lansia berhasil dihapus!" });
  } catch (error: any) {
    res.status(400).json({ message: "Gagal hapus data!" });
  }
};
