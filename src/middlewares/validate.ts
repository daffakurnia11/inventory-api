import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ data: errors.array()[0].msg, message: "Validation error", statusCode: 400 });
  }
  next();
};
