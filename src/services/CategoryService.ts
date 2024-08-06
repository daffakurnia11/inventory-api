import CategoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

class CategoryService {
  async list() {
    const categories = await CategoryRepository.list();
    return categories;
  }

  async create(categoryData: Category) {
    const category = await CategoryRepository.create(categoryData);
    return category;
  }

  async get(id: string) {
    const category = await CategoryRepository.findById(id);
    return category;
  }

  async update(id: string, categoryData: Category) {
    const category = await CategoryRepository.update(id, categoryData);
    return category;
  }

  async delete(id: string) {
    await CategoryRepository.delete(id);
  }
}

export default new CategoryService();
