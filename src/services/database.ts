import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'products.db';
const database_version = '1.0';
const database_displayname = 'Products Database';
const database_size = 200000;

export const getDBConnection = async () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT,
      description TEXT,
      price REAL,
      thumbnail TEXT
    );
  `;
  await db.executeSql(query);
};

export const saveProducts = async (db: SQLite.SQLiteDatabase, products: any[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO products (id, title, description, price, thumbnail) VALUES (?, ?, ?, ?, ?)`;

  for (const product of products) {
    await db.executeSql(insertQuery, [
      product.id,
      product.title,
      product.description,
      product.price,
      product.thumbnail
    ]);
  }
};

export const getProducts = async (db: SQLite.SQLiteDatabase) => {
  try {
    const products: any[] = [];
    const results = await db.executeSql('SELECT * FROM products');

    results.forEach((result : any) => {
      for (let i = 0; i < result.rows.length; i++) {
        products.push(result.rows.item(i));
      }
    });

    return products;
  } catch (error) {
    console.error('Error fetching products from SQLite:', error);
    return [];
  }
};
