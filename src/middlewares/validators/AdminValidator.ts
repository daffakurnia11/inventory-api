import { body } from "express-validator";
import AdminRepository from "../../repositories/AdminRepository";

export const registerValidation = [
  body("firstName").isString().isLength({ min: 2, max: 30 }).withMessage("First name must be between 2 and 30 characters"),
  body("lastName").isString().isLength({ min: 2, max: 30 }).withMessage("Last name must be between 2 and 30 characters"),
  body("email").isEmail().withMessage("Invalid email format").custom(async (email) => {
    const emailExists = await AdminRepository.emailExists(email);
    if (emailExists) {
      throw new Error("Email already registered");
    }
  }),
  body("birthDate").isISO8601().toDate().withMessage("Invalid birth date format"),
  body("gender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 6 characters long"),
];
