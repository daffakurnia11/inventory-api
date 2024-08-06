import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Product } from "../models/Product";

class ProductRepository {
  async list(): Promise<Product[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM products");
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
      .query<ResultSetHeader>("DELETE FROM products WHERE id = ?", [
        id,
      ]);
  }
}

export default new ProductRepository();
