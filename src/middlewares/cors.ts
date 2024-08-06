import { Request, Response, NextFunction } from "express";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    process.env.ALLOW_HEADERS ||
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      process.env.ALLOW_METHODS || "GET, POST, PUT, DELETE, PATCH"
    );
    return res.status(200).json({});
  }
  next();
};
