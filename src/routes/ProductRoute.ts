import express from "express";
import { handleValidation } from "../middlewares/validate";
import { productValidation } from "../middlewares/validators/ProductValidator";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.get("/", ProductController.list);
router.post("/", productValidation, handleValidation, ProductController.create);
router.get("/:id", ProductController.get);
router.patch("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
