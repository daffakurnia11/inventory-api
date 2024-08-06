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