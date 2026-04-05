const Customer = require('../models/customer.model');

const getAllCustomers = async (req, res) => {
  try {
    const result = await Customer.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const addCustomer = async (req, res) => {
  const { name, address, panCardNumber, GSTNumber, status } = req.body;

  if (!name || !address || !panCardNumber || !status) {
    return res.status(400).json({ error: 'Name, address, PAN card and status are required' });
  }

  try {
    const result = await Customer.create(name, address, panCardNumber, GSTNumber, status);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Customer name already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to add customer' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

module.exports = { getAllCustomers, addCustomer, deleteCustomer };
