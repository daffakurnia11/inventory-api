import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Admin } from "../models/Admin";
import AdminQueries from "../queries/AdminQueries";

class AdminRepository {
  async create(adminData: Admin): Promise<string> {
    const id = uuidv4();
    await db
      .promise()
      .query<ResultSetHeader>(AdminQueries.createAdminQuery, [
        id,
        adminData.firstName,
        adminData.lastName,
        adminData.email,
        adminData.birthDate,
        adminData.gender,
        adminData.password,
      ]);
    return id;
  }

  async findByEmail(email: string): Promise<RowDataPacket> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(AdminQueries.findByEmailQuery, [email]);
    return rows[0];
  }

  async findById(id: string): Promise<Admin | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(AdminQueries.findByIdQuery, [id]);
    if (rows.length === 0) return null;
    return rows[0] as Admin;
  }

  async emailExists(email: string): Promise<boolean> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(AdminQueries.emailExistsQuery, [email]);
    return rows.length > 0;
  }

  async update(id: string, adminData: Admin): Promise<void> {
    await db
      .promise()
      .query<ResultSetHeader>(AdminQueries.updateAdminQuery, [
        adminData.firstName,
        adminData.lastName,
        adminData.email,
        adminData.birthDate,
        adminData.gender,
        id,
      ]);
  }

  async getPasswordById(id: string): Promise<string | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(AdminQueries.getPasswordByIdQuery, [id]);
    if (rows.length === 0) return null;
    return rows[0].password;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await db
      .promise()
      .query<ResultSetHeader>(AdminQueries.updatePasswordQuery, [password, id]);
  }
}

export default new AdminRepository();
