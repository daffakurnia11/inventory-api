import express from "express";
import AdminController from "../controllers/AdminController";
import {
  updateProfileValidation,
  changePasswordValidation,
} from "../middlewares/validators/AdminValidator";
import { handleValidation } from "../middlewares/validate";

const router = express.Router();

router.get("/", AdminController.getProfile);
router.patch(
  "/",
  updateProfileValidation,
  handleValidation,
  AdminController.updateProfile
);
router.patch(
  "/change-password",
  changePasswordValidation,
  handleValidation,
  AdminController.changePassword
);

export default router;
