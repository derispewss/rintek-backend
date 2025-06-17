import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validate";
import {
    createUserKategori,
    getUserKategoriByUser,
    deleteUserKategori
} from "../controllers/userKategori.controller";

const router = express.Router();

router.post("/", [
    body("user_id").notEmpty().withMessage("ID user wajib diisi"),
    body("kategori_id").notEmpty().withMessage("ID kategori wajib diisi"),
    validateRequest
], createUserKategori);
router.get("/:userId", [
    param("userId").notEmpty().withMessage("ID user wajib diisi"),
    validateRequest
], getUserKategoriByUser);
router.delete("/:id", [
    param("id").notEmpty().withMessage("ID relasi user-kategori wajib diisi"),
    validateRequest
],  deleteUserKategori);

export default router;
