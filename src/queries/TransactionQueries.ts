class TransactionQueries {
  static listTransactionsQuery = `
    SELECT 
      t.id AS id,
      JSON_OBJECT(
        'id', a.id,
        'first_name', a.first_name,
        'last_name', a.last_name,
        'email', a.email,
        'birth_date', a.birth_date,
        'gender', a.gender
      ) AS admin,
      JSON_OBJECT(
        'id', p.id,
        'product_name', p.product_name,
        'product_description', p.product_description,
        'product_image', p.product_image,
        'stock', p.stock,
        'category', JSON_OBJECT(
          'id', c.id,
          'category_name', c.category_name,
          'category_description', c.category_description
        )
      ) AS product,
      t.quantity,
      t.state,
      t.created_at AS created_at,
      t.updated_at AS updated_at
    FROM 
      transactions t
    JOIN 
      admins a ON t.user_id = a.id
    JOIN 
      products p ON t.product_id = p.id
    JOIN
      product_categories c ON p.category_id = c.id
    ORDER BY 
      t.created_at
    DESC;
  `;

  static findTransactionByIdQuery = `
  SELECT 
      t.id AS id,
      JSON_OBJECT(
        'id', a.id,
        'first_name', a.first_name,
        'last_name', a.last_name,
        'email', a.email,
        'birth_date', a.birth_date,
        'gender', a.gender
      ) AS admin,
      JSON_OBJECT(
        'id', p.id,
        'product_name', p.product_name,
        'product_description', p.product_description,
        'product_image', p.product_image,
        'stock', p.stock,
        'category', JSON_OBJECT(
          'id', c.id,
          'category_name', c.category_name,
          'category_description', c.category_description
        )
      ) AS product,
      t.quantity,
      t.state,
      t.created_at AS created_at,
      t.updated_at AS updated_at
    FROM 
      transactions t
    JOIN 
      admins a ON t.user_id = a.id
    JOIN 
      products p ON t.product_id = p.id
    JOIN
      product_categories c ON p.category_id = c.id
    WHERE 
      t.id = ?
    ORDER BY 
      t.created_at
    DESC
  `;

  static createTransactionQuery = `
    INSERT INTO transactions (
      id,
      user_id, 
      product_id,
      quantity,
      state
    ) VALUES (?, ?, ?, ?, ?)
  `;
}

export default TransactionQueries;
