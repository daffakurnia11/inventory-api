import { v4 as uuidv4 } from "uuid";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Product } from "../models/Product";
import ProductQueries from "../queries/ProductQueries";

class ProductRepository {
  async list(): Promise<Product[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(ProductQueries.listProductsQuery);
    return rows as Product[];
  }

  async listByCategory(categoryId: string): Promise<Product[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(ProductQueries.listByCategoryQuery, [categoryId]);
    return rows as Product[];
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(ProductQueries.findByIdQuery, [id]);
    if (rows.length === 0) return null;
    return rows[0] as Product;
  }

  async create(productData: Product): Promise<Product | null> {
    const id = uuidv4();
    await db
      .promise()
      .query<ResultSetHeader>(ProductQueries.createProductQuery, [
        id,
        productData.product_name,
        productData.product_description,
        productData.product_image,
        productData.category_id,
        productData.stock,
      ]);

    const product = await this.findById(id);
    return product;
  }

  async update(id: string, productData: Product): Promise<Product | null> {
    await db
      .promise()
      .query<ResultSetHeader>(ProductQueries.updateProductQuery, [
        productData.product_name,
        productData.product_description,
        productData.product_image,
        productData.category_id,
        productData.stock,
        id,
      ]);

    const product = await this.findById(id);
    return product;
  }

  async delete(id: string): Promise<void> {
    await db
      .promise()
      .query<ResultSetHeader>(ProductQueries.deleteProductQuery, [id]);
  }
}

export default new ProductRepository();
