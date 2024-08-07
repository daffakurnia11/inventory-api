class CategoryQueries {
  static listCategoriesQuery = `
    SELECT 
      c.id AS id, 
      c.category_name, 
      c.category_description, 
      c.created_at, 
      c.updated_at,
      CASE 
        WHEN COUNT(p.id) = 0 THEN NULL
        ELSE JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', p.id,
            'product_name', p.product_name,
            'product_description', p.product_description,
            'product_image', p.product_image,
            'stock', p.stock,
            'created_at', p.created_at,
            'updated_at', p.updated_at
          )
        )
      END AS products
    FROM 
      product_categories c 
    LEFT JOIN 
      (SELECT * FROM products ORDER BY created_at DESC) p 
    ON 
      c.id = p.category_id 
    GROUP BY 
      c.id, c.category_name, c.category_description, c.created_at, c.updated_at
    ORDER BY 
      c.created_at
    DESC
  `;

  static findCategoryByIdQuery = `
    SELECT 
      c.id AS id, 
      c.category_name, 
      c.category_description, 
      c.created_at, 
      c.updated_at,
      CASE 
        WHEN COUNT(p.id) = 0 THEN NULL
        ELSE JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', p.id,
            'product_name', p.product_name,
            'product_description', p.product_description,
            'product_image', p.product_image,
            'stock', p.stock,
            'created_at', p.created_at,
            'updated_at', p.updated_at
          )
        )
      END AS products
    FROM 
      product_categories c 
    LEFT JOIN 
      (SELECT * FROM products ORDER BY created_at DESC) p 
    ON 
      c.id = p.category_id 
    WHERE c.id = ?
    GROUP BY 
      c.id, c.category_name, c.category_description, c.created_at, c.updated_at
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
