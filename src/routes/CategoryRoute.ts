import express from "express";
import CategoryController from "../controllers/CategoryController";
import { createValidation } from "../middlewares/validators/CategoryValidator";
import { handleValidation } from "../middlewares/validate";

const router = express.Router();

router.post("/", createValidation, handleValidation, CategoryController.create);

export default router;
