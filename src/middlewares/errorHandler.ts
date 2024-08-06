import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Debug errors

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error: err.data,
  });
};
