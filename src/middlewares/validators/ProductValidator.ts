import { body } from "express-validator";

export const productValidation = [
  body("product_name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters"),
  body("product_description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("Description must be between 2 and 100 characters"),
  body("product_image")
    .not()
    .isEmpty()
    .withMessage("Image is required")
    .isString()
    .withMessage("Image must be a string"),
  body("category_id")
    .not()
    .isEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("Stock is required")
    .isNumeric()
    .withMessage("Stock must be a number"),
];
