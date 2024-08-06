import express from "express";
import AdminController from "../controllers/AdminController";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validators/AdminValidator";
import { handleValidation } from "../middlewares/validate";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  handleValidation,
  AdminController.register
);
router.post("/login", loginValidation, handleValidation, AdminController.login);

router.get("/profile", authenticateToken, AdminController.getProfile);
router.patch("/profile", authenticateToken, AdminController.updateProfile);

export default router;
