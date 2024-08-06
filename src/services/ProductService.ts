import { Product } from "../models/Product";
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
}

export default new ProductService();
