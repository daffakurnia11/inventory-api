import AdminRepository from "../repositories/AdminRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt";
import { Admin } from "../models/Admin";
import { AuthenticationError, EmailAlreadyRegisteredError } from "../errors";

class AdminService {
  async register(adminData: Admin) {
    const emailExists = await AdminRepository.emailExists(adminData.email);
    if (emailExists) {
      throw new EmailAlreadyRegisteredError("Email already registered");
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
}

export default new AdminService();
