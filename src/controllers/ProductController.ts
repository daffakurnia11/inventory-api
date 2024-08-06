import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  async list(_: any, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.list();
      res.success(products, "Products retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.create(req.body);
      res.success(product, "Product created successfully");
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.get(id);
      res.success(
        product,
        `${product?.product_name} product retrieved successfully`
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.update(id, req.body);
      res.success(product, "Product updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductService.delete(id);
      res.success(null, "Product deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
