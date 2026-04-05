const pool = require('../config/db');

const getAll = () =>
  pool.query('SELECT * FROM customers ORDER BY id ASC');

const create = (name, address, panCardNumber, GSTNumber, status) =>
  pool.query(
    `INSERT INTO customers (name, address, pan_card_number, gst_number, status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, address, panCardNumber, GSTNumber || null, status]
  );

const remove = (id) =>
  pool.query('DELETE FROM customers WHERE id = $1', [id]);

module.exports = { getAll, create, remove };
