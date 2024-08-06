import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
  async list(_: any, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.list();
      res.success(categories, "Categories retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.create(req.body);
      res.success(category, "Category created successfully");
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryService.get(id);
      res.success(
        category,
        `${category?.category_name} category retrieved successfully`
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
