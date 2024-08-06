import { body } from "express-validator";

export const transactionValidation = [
  body("product_id")
    .not()
    .isEmpty()
    .withMessage("Product is required")
    .isString()
    .withMessage("Product must be valid"),
  body("quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("state")
    .not()
    .isEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be valid"),
];

export const bulkTransactionValidation = [
  body("transactions")
    .not()
    .isEmpty()
    .withMessage("Transactions are required")
    .isArray()
    .withMessage("Transactions must be an array"),
  body("transactions.*.product_id")
    .not()
    .isEmpty()
    .withMessage("Product is required")
    .isString()
    .withMessage("Product must be valid"),
  body("transactions.*.quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("transactions.*.state")
    .not()
    .isEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be valid"),
];