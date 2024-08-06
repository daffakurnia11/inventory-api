import mysql, { Connection } from 'mysql2';

const db: Connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'inventory_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

export default db;
