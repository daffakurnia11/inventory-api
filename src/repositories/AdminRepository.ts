import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Admin } from "../models/Admin";

class AdminRepository {
  async create(adminData: Admin): Promise<number> {
    const id = uuidv4();
    const [result] = await db
      .promise()
      .query<ResultSetHeader>(
        "INSERT INTO admins (id, first_name, last_name, email, birth_date, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          adminData.firstName,
          adminData.lastName,
          adminData.email,
          adminData.birthDate,
          adminData.gender,
          adminData.password,
        ]
      );
    return result.insertId;
  }

  async findByEmail(email: string): Promise<RowDataPacket> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0];
  }

  async findById(id: number): Promise<Admin | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT id, first_name AS firstName, last_name AS lastName, email, birth_date AS birthDate, gender FROM admins WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0] as Admin;
  }

  async emailExists(email: string): Promise<boolean> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT 1 FROM admins WHERE email = ?", [email]);
    return rows.length > 0;
  }
}

export default new AdminRepository();
