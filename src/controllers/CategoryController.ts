import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.create(req.body);
      res.success(category, "Category created successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();