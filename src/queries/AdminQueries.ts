class AdminQueries {
  static createAdminQuery = `
    INSERT INTO admins (
      id, 
      first_name, 
      last_name, 
      email, 
      birth_date, 
      gender, 
      password
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  static findByEmailQuery = `
    SELECT * FROM admins WHERE email = ?
  `;

  static findByIdQuery = `
    SELECT id, first_name AS firstName, last_name AS lastName, email, birth_date AS birthDate, gender, created_at, updated_at 
    FROM admins 
    WHERE id = ?
  `;

  static emailExistsQuery = `
    SELECT 1 FROM admins WHERE email = ?
  `;

  static updateAdminQuery = `
    UPDATE admins SET first_name = ?, last_name = ?, email = ?, birth_date = ?, gender = ? 
    WHERE id = ?
  `;

  static getPasswordByIdQuery = `
    SELECT password FROM admins WHERE id = ?
  `;

  static updatePasswordQuery = `
    UPDATE admins SET password = ? WHERE id = ?
  `;
}

export default AdminQueries;
