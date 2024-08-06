class CategoryQueries {
  static listCategoriesQuery = `
    SELECT * FROM product_categories ORDER BY created_at
  `;

  static findCategoryByIdQuery = `
    SELECT * FROM product_categories WHERE id = ?
  `;

  static createCategoryQuery = `
    INSERT INTO product_categories (id, category_name, category_description) 
    VALUES (?, ?, ?)
  `;

  static updateCategoryQuery = `
    UPDATE product_categories SET category_name = ?, category_description = ? 
    WHERE id = ?
  `;

  static deleteCategoryQuery = `
    DELETE FROM product_categories WHERE id = ?
  `;
}

export default CategoryQueries;
