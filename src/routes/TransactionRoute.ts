import express from "express";
import { handleValidation } from "../middlewares/validate";
import TransactionController from "../controllers/TransactionController";
import { bulkTransactionValidation, transactionValidation } from "../middlewares/validators/TransactionValidator";

const router = express.Router();

router.get("/", TransactionController.list);
router.post("/", transactionValidation, handleValidation, TransactionController.create);
router.post('/bulk', bulkTransactionValidation, handleValidation, TransactionController.bulkCreate);

export default router;
