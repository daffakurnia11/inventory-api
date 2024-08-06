import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Product } from "../models/Product";

class ProductRepository {
  async list(): Promise<Product[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT products.id, products.product_name, products.product_description, products.product_image, products.stock, products.created_at, products.updated_at, product_categories.category_name as category_name, product_categories.category_description as category_description FROM products JOIN product_categories ON products.category_id = product_categories.id ORDER BY products.created_at"
      );

    return rows as Product[];
  }

  async listByCategory(categoryId: string): Promise<Product[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT id, product_name, product_description, product_image, stock, created_at, updated_at FROM products WHERE category_id = ? ORDER BY created_at",
        [categoryId]
      );
    return rows as Product[];
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0] as Product;
  }

  async create(productData: Product): Promise<Product | null> {
    const id = uuidv4();
    await db
      .promise()
      .query<ResultSetHeader>(
        "INSERT INTO products (id, product_name, product_description, product_image, category_id, stock) VALUES (?, ?, ?, ?, ?, ?)",
        [
          id,
          productData.product_name,
          productData.product_description,
          productData.product_image,
          productData.category_id,
          productData.stock,
        ]
      );

    const Product = await this.findById(id);
    return Product;
  }

  async update(id: string, productData: Product): Promise<Product | null> {
    await db
      .promise()
      .query<ResultSetHeader>(
        "UPDATE products SET product_name = ?, product_description = ?, product_image = ?, category_id = ?, stock = ? WHERE id = ?",
        [
          productData.product_name,
          productData.product_description,
          productData.product_image,
          productData.category_id,
          productData.stock,
          id,
        ]
      );
    const Product = await this.findById(id);
    return Product;
  }

  async delete(id: string): Promise<void> {
    await db
      .promise()
      .query<ResultSetHeader>("DELETE FROM products WHERE id = ?", [id]);
  }
}

export default new ProductRepository();
