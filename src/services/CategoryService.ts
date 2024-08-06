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
}

export default new CategoryService();
