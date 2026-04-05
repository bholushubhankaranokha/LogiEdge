const express = require('express');
const router = express.Router();
const { getAllCustomers, addCustomer, deleteCustomer } = require('../controllers/customer.controller');

router.get('/', getAllCustomers);
router.post('/', addCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
