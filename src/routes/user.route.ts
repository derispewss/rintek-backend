import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validate";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id",
  [
    param("id").isUUID().withMessage("ID harus berupa UUID"), 
    validateRequest
  ],
  getUserById
);
router.put('/:id', 
  [
    param("id").isUUID().withMessage("ID harus berupa UUID"),
    body("name").notEmpty().withMessage("Nama wajib diisi"),
    validateRequest
  ],
  updateUser
);
router.delete('/:id',
  [
    param("id").isUUID().withMessage("ID harus berupa UUID"),
    validateRequest
  ],
  deleteUser
);

export default router;
