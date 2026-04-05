const pool = require('../config/db');

const getAll = () =>
  pool.query('SELECT * FROM invoices ORDER BY id ASC');

const create = (invoiceId, customerName, itemName, amount, quantity, totalAmount, address, pan, gstNum) =>
  pool.query(
    `INSERT INTO invoices
      (invoice_id, customer_name, item_name, amount, quantity, total_amount, address, pan, gst_num)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [invoiceId, customerName, itemName, amount, quantity, totalAmount, address, pan, gstNum || null]
  );

module.exports = { getAll, create };
