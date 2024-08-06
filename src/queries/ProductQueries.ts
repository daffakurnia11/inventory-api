class ProductQueries {
  static listProductsQuery = `
    SELECT 
      products.id, 
      products.product_name, 
      products.product_description, 
      products.product_image, 
      products.stock, 
      products.created_at, 
      products.updated_at, 
      product_categories.category_name as category_name, 
      product_categories.category_description as category_description 
    FROM products 
    JOIN product_categories ON products.category_id = product_categories.id 
    ORDER BY products.created_at
  `;

  static listByCategoryQuery = `
    SELECT 
      id, 
      product_name, 
      product_description, 
      product_image, 
      stock, 
      created_at, 
      updated_at 
    FROM products 
    WHERE category_id = ? 
    ORDER BY created_at
  `;

  static findByIdQuery = `
    SELECT * FROM products WHERE id = ?
  `;

  static createProductQuery = `
    INSERT INTO products (
      id, 
      product_name, 
      product_description, 
      product_image, 
      category_id, 
      stock
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  static updateProductQuery = `
    UPDATE products 
    SET 
      product_name = ?, 
      product_description = ?, 
      product_image = ?, 
      category_id = ?, 
      stock = ? 
    WHERE id = ?
  `;

  static deleteProductQuery = `
    DELETE FROM products WHERE id = ?
  `;
}

export default ProductQueries;
