import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import { BadRequestError } from "../errors";
import ProductService from "../services/ProductService";

class TransactionController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const transactions = await TransactionService.list();
      res.success(transactions, "Transactions retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = (req as any).user.id;
      await ProductService.stockUpdate(req.body.product_id, req.body.quantity, req.body.state);
      const transaction = await TransactionService.create({...req.body, user_id: adminId});
      if (!transaction) {
        throw new BadRequestError("Transaction not created");
      }
      res.success(transaction, "Transaction created successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
