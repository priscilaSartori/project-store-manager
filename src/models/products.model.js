const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (products) => {
  const columns = Object.keys((products)).join(', ');
  const placeholders = Object.keys(products)
    .map((_key) => '?')
    .join(', ');
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(products)],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products 
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );
  return { name, id };
};

module.exports = { getAll, getById, insert, updateProduct };