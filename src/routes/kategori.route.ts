import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validate";
import {
  getAllKategori,
  createKategori,
  getKategoriById,
  updateKategori,
  deleteKategori,
  getKategoriBySlug,
  getKategoriByType
} from "../controllers/kategori.controller";

const router = express.Router();

router.get("/", getAllKategori);
router.get(
  "/:id",
  [
    param("id").notEmpty().withMessage("ID kategori wajib diisi"),
    validateRequest,
  ],
  getKategoriById
);
router.get(
  "/slug/:slug",
  [
    param("slug").notEmpty().withMessage("Slug kategori wajib diisi"),
    validateRequest,
  ],
  getKategoriBySlug
);
router.get(
  "/type/:type",
  [
    param("type").notEmpty().withMessage("Tipe kategori wajib diisi"),
    validateRequest,
  ],
  getKategoriByType
);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Nama kategori wajib diisi"),
    body("room_name").notEmpty().withMessage("Nama ruang wajib diisi"),
    body("room_desc").notEmpty().withMessage("Deskripsi ruang wajib diisi"),
    body("slug").notEmpty().withMessage("Slug wajib diisi"),
    body("type")
      .isIn(["PRIBADI", "KOMUNITAS"])
      .withMessage("Tipe kategori harus PRIBADI atau KOMUNITAS"),
    validateRequest,
  ],
  createKategori
);
router.put(
  "/:id",
  [
    param("id").notEmpty().withMessage("ID kategori wajib diisi"),
    body("name").notEmpty().withMessage("Nama kategori wajib diisi"),
    body("room_name").notEmpty().withMessage("Nama ruang wajib diisi"),
    body("room_desc").notEmpty().withMessage("Deskripsi ruang wajib diisi"),
    body("slug").notEmpty().withMessage("Slug wajib diisi"),
    body("type")
      .isIn(["PRIBADI", "KOMUNITAS"])
      .withMessage("Tipe kategori harus PRIBADI atau KOMUNITAS"),
    validateRequest,
  ],
  updateKategori
);
router.delete(
  "/:id",
  [
    param("id").notEmpty().withMessage("ID kategori wajib diisi"),
    validateRequest,
  ],
  deleteKategori
);

export default router;
