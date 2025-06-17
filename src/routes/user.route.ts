import express from "express";
import {  body, param } from "express-validator";
import { validateRequest } from "../middlewares/validate";
import {
  getUsers,
  getUserById,
  subscribeUser
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
router.post("/:id/subscribe",
  [
    param("id").isUUID().withMessage("ID harus berupa UUID"), 
    body("subscription_type").isIn(["PRIBADI", "KOMUNITAS"]).withMessage("Tipe langganan harus PRIBADI atau KOMUNITAS"),
    validateRequest
  ],
  subscribeUser
);

export default router;
