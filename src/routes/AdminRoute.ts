import express from "express";
import AdminController from "../controllers/AdminController";
import { registerValidation, loginValidation } from "../middlewares/validators/AdminValidator";
import { handleValidation } from "../middlewares/validate";

const router = express.Router();

router.post("/register", registerValidation, handleValidation, AdminController.register);
router.post("/login", loginValidation, handleValidation, AdminController.login);

export default router;
