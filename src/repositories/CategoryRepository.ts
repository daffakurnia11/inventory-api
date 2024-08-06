import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Category } from "../models/Category";

class CategoryRepository {
  async list(): Promise<Category[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM product_categories");
    return rows as Category[];
  }

  async findById(id: string): Promise<Category | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM product_categories WHERE id = ?", [
        id,
      ]);
    if (rows.length === 0) return null;
    return rows[0] as Category;
  }

  async create(categoryData: Category): Promise<Category | null> {
    const id = uuidv4();
    const [rows] = await db
      .promise()
      .query<ResultSetHeader>(
        "INSERT INTO product_categories (id, category_name, category_description) VALUES (?, ?, ?)",
        [id, categoryData.category_name, categoryData.category_description]
      );

    const category = await this.findById(id);
    return category;
  }
}

export default new CategoryRepository();
