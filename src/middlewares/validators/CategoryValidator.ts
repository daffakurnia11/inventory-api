import { body } from "express-validator";

export const createValidation = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters"),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("Description must be between 2 and 100 characters"),
];
