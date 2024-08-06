import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (data: any, message?: string) => void;
    }
  }
}

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (data: any, message: string = "Success") => {
    res.json({
      success: true,
      status: res.statusCode,
      message,
      data,
    });
  };

  next();
};
