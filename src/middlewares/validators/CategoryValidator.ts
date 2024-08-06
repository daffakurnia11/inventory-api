import { body } from "express-validator";

export const categoryValidation = [
  body("category_name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters"),
  body("category_description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("Description must be between 2 and 100 characters"),
];
