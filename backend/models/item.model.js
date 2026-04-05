const pool = require('../config/db');

const getAll = () =>
  pool.query('SELECT * FROM items ORDER BY id ASC');

const create = (itemName, sellingPrice, status) =>
  pool.query(
    `INSERT INTO items (item_name, selling_price, status)
     VALUES ($1, $2, $3) RETURNING *`,
    [itemName, sellingPrice, status]
  );

const remove = (id) =>
  pool.query('DELETE FROM items WHERE id = $1', [id]);

module.exports = { getAll, create, remove };
