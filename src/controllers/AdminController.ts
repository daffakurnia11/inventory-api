import { Request, Response, NextFunction } from "express";
import AdminService from "../services/AdminService";

class AdminController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AdminService.register(req.body);
      res.success(user, "Successfully registered");
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, user } = await AdminService.login(
        req.body.email,
        req.body.password
      );
      res.success({ token, user }, "Successfully logged in");
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AdminController();
