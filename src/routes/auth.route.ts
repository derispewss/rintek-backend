import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate";
import { loginUser, createUser } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Nama wajib diisi"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter"),
    validateRequest,
  ],
  createUser
);
router.post(
  "/login",
  [
    body("name").notEmpty().withMessage("Nama wajib diisi"),
    body("password").notEmpty().withMessage("Password wajib diisi"),
    validateRequest,
  ],
  loginUser
);

export default router;
