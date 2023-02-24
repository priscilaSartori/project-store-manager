const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertProduct = async (id, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
  return result;
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, product_id AS productId, quantity, date 
    FROM StoreManager.sales_products AS sp 
    INNER JOIN StoreManager.sales AS s 
    ON sp.sale_id = s.id 
    ORDER BY saleId, productId`,
  );
  return result;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT product_id AS productId, quantity, date 
    FROM StoreManager.sales_products AS sp 
    INNER JOIN StoreManager.sales AS s 
    ON sp.sale_id = s.id 
    WHERE id = ?`,
    [saleId],
  );
  return sale;
};

module.exports = { insert, insertProduct, getAll, getById };