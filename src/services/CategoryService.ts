import CategoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

class CategoryService {
  async create(categoryData: Category) {
    const category = await CategoryRepository.create(categoryData);
    return category;
  }
}

export default new CategoryService();
