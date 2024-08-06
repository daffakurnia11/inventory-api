import { Product } from "../models/Product";
import { Transaction } from "../models/Transaction";
import ProductRepository from "../repositories/ProductRepository";

class ProductService {
  async list() {
    const categories = await ProductRepository.list();
    return categories;
  }

  async create(productData: Product) {
    const category = await ProductRepository.create(productData);
    return category;
  }

  async get(id: string) {
    const category = await ProductRepository.findById(id);
    return category;
  }

  async update(id: string, productData: Product) {
    const category = await ProductRepository.update(id, productData);
    return category;
  }

  async delete(id: string) {
    await ProductRepository.delete(id);
  }

  async stockUpdate(id: string, stock: number, state: "In" | "Out") {
    await ProductRepository.stockUpdate(id, stock, state);
  }

  async bulkStockUpdate(transactions: Transaction[]) {
    await ProductRepository.bulkStockUpdate(transactions);
  }
}

export default new ProductService();
