import { Request, Response, NextFunction } from "express";
import AdminService from "../services/AdminService";
import { AuthenticationError } from "../errors";

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

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = (req as any).user.id;
      const admin = await AdminService.findById(adminId);
      if (!admin) {
        throw new AuthenticationError("User not found");
      }
      res.success(admin, "Profile retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = (req as any).user.id;
      await AdminService.updateProfile(adminId, req.body);
      res.success(req.body, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
