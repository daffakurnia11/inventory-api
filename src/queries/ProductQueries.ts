class ProductQueries {
  static listProductsQuery = `
    SELECT 
      p.id AS id, 
      p.product_name, 
      p.product_description, 
      p.product_image, 
      p.stock, 
      p.created_at, 
      p.updated_at, 
      JSON_OBJECT(
        'id', pc.id,
        'category_name', pc.category_name,
        'category_description', pc.category_description
      ) AS category
    FROM 
      products p
    JOIN 
      product_categories pc ON p.category_id = pc.id 
    ORDER BY 
      p.created_at
    DESC
  `;

  static findByIdQuery = `
    SELECT 
      p.id AS id, 
      p.product_name, 
      p.product_description, 
      p.product_image, 
      p.stock, 
      p.created_at, 
      p.updated_at, 
      JSON_OBJECT(
        'id', pc.id,
        'category_name', pc.category_name,
        'category_description', pc.category_description
      ) AS category
    FROM 
      products p
    JOIN 
      product_categories pc ON p.category_id = pc.id 
    WHERE 
      p.id = ?
    ORDER BY 
      p.created_at
    DESC
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

  static stockUpdateProductQuery = `
    UPDATE products SET stock = stock + ? WHERE id = ?
  `;
}

export default ProductQueries;
