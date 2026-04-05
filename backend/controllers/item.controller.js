const Item = require('../models/item.model');

const getAllItems = async (req, res) => {
  try {
    const result = await Item.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const addItem = async (req, res) => {
  const { itemName, sellingPrice, status } = req.body;

  if (!itemName || !sellingPrice || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await Item.create(itemName, sellingPrice, status);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Item name already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

const deleteItem = async (req, res) => {
  try {
    await Item.remove(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = { getAllItems, addItem, deleteItem };
