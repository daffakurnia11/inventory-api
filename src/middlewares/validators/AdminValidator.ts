import { body } from "express-validator";
import AdminRepository from "../../repositories/AdminRepository";

export const registerValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters"),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be between 2 and 30 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const emailExists = await AdminRepository.emailExists(email);
      if (emailExists) {
        throw new Error("Email already registered");
      }
    }),
  body("birthDate")
    .not()
    .isEmpty()
    .withMessage("Birth date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid birth date format"),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    
];

export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
];

export const updateProfileValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters"),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be between 2 and 30 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("birthDate")
    .not()
    .isEmpty()
    .withMessage("Birth date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid birth date format"),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
];
