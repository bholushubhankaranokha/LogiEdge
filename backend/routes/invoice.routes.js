const express = require('express');
const router = express.Router();
const { getAllInvoices, createInvoice } = require('../controllers/invoice.controller');

router.get('/', getAllInvoices);
router.post('/', createInvoice);

module.exports = router;
