import express from "express";
import CategoryController from "../controllers/CategoryController";
import { categoryValidation } from "../middlewares/validators/CategoryValidator";
import { handleValidation } from "../middlewares/validate";

const router = express.Router();

router.get("/", CategoryController.list);
router.post("/", categoryValidation, handleValidation, CategoryController.create);
router.get("/:id", CategoryController.get);
router.patch("/:id", categoryValidation, handleValidation, CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
