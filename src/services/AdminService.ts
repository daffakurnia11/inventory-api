import AdminRepository from "../repositories/AdminRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt";
import { Admin } from "../models/Admin";
import { AuthenticationError, BadRequestError } from "../errors";

class AdminService {
  async register(adminData: Admin) {
    const emailExists = await AdminRepository.emailExists(adminData.email);
    if (emailExists) {
      throw new BadRequestError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    const adminId = await AdminRepository.create(adminData);
    const newAdmin = await AdminRepository.findById(adminId);

    return newAdmin;
  }

  async login(email: string, password: string) {
    const admin = await AdminRepository.findByEmail(email);
    if (!admin) throw new AuthenticationError("User not found");

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new AuthenticationError("User not found");

    const token = jwt.sign({ id: admin.id, email: admin.email }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
    return { token, user: admin };
  }

  async findById(id: string): Promise<Admin | null> {
    return AdminRepository.findById(id);
  }

  async updateProfile(id: string, adminData: Admin) {
    return AdminRepository.update(id, adminData);
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    if (newPassword !== confirmPassword)
      throw new BadRequestError("Passwords do not match");

    const password = await AdminRepository.getPasswordById(id);
    if (!password) throw new AuthenticationError("User not found");

    const isPasswordValid = await bcrypt.compare(oldPassword, password);
    if (!isPasswordValid) throw new AuthenticationError("Wrong password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await AdminRepository.updatePassword(id, hashedPassword);
  }
}

export default new AdminService();
