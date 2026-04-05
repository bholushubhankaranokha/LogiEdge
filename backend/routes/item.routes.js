const express = require('express');
const router = express.Router();
const { getAllItems, addItem, deleteItem } = require('../controllers/item.controller');

router.get('/', getAllItems);
router.post('/', addItem);
router.delete('/:id', deleteItem);

module.exports = router;
