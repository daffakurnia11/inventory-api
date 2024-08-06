import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Category } from "../models/Category";
import ProductRepository from "./ProductRepository";

class CategoryRepository {
  async list(): Promise<Category[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT * FROM product_categories ORDER BY created_at"
      );

    const categoriesWithProducts = await Promise.all(
      rows.map(async (row) => {
        const products = await ProductRepository.listByCategory(row.id);
        return {
          ...row,
          products: products,
        };
      })
    );

    return categoriesWithProducts as Category[];
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
    await db
      .promise()
      .query<ResultSetHeader>(
        "INSERT INTO product_categories (id, category_name, category_description) VALUES (?, ?, ?)",
        [id, categoryData.category_name, categoryData.category_description]
      );

    const category = await this.findById(id);
    return category;
  }

  async update(id: string, categoryData: Category): Promise<Category | null> {
    await db
      .promise()
      .query<ResultSetHeader>(
        "UPDATE product_categories SET category_name = ?, category_description = ? WHERE id = ?",
        [categoryData.category_name, categoryData.category_description, id]
      );
    const category = await this.findById(id);
    return category;
  }

  async delete(id: string): Promise<void> {
    await db
      .promise()
      .query<ResultSetHeader>("DELETE FROM product_categories WHERE id = ?", [
        id,
      ]);
  }
}

export default new CategoryRepository();
