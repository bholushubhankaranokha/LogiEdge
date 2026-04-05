const Invoice = require('../models/invoice.model');

const getAllInvoices = async (req, res) => {
  try {
    const result = await Invoice.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createInvoice = async (req, res) => {
  const { invoiceId, customerName, itemName, amount, quantity, totalAmount, address, pan, gstNum } = req.body;

  if (!invoiceId || !customerName || !itemName || !amount || !quantity || !totalAmount || !address || !pan) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  try {
    const result = await Invoice.create(invoiceId, customerName, itemName, amount, quantity, totalAmount, address, pan, gstNum);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

module.exports = { getAllInvoices, createInvoice };
