const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const customerRoutes = require('./routes/customer.routes');
const itemRoutes    = require('./routes/item.routes');
const invoiceRoutes = require('./routes/invoice.routes');

const app = express();
app.use(cors());
app.use(express.json());

//  Mount routes 
app.use('/api/customers', customerRoutes);
app.use('/api/items',     itemRoutes);
app.use('/api/invoices',  invoiceRoutes);

//  DB setup (create tables if missing) 
async function setupDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id              SERIAL PRIMARY KEY,
        name            VARCHAR(255) UNIQUE NOT NULL,
        address         VARCHAR(255) NOT NULL,
        pan_card_number VARCHAR(10)  NOT NULL,
        gst_number      VARCHAR(15),
        status          VARCHAR(20)  NOT NULL DEFAULT 'Active',
        created_at      TIMESTAMP    DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id            SERIAL PRIMARY KEY,
        item_name     VARCHAR(255) UNIQUE NOT NULL,
        selling_price NUMERIC(12,2) NOT NULL,
        status        VARCHAR(20)   NOT NULL DEFAULT 'Active',
        created_at    TIMESTAMP     DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id            SERIAL PRIMARY KEY,
        invoice_id    VARCHAR(20)  UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        item_name     VARCHAR(255) NOT NULL,
        amount        NUMERIC(12,2) NOT NULL,
        quantity      INT           NOT NULL,
        total_amount  NUMERIC(12,2) NOT NULL,
        address       VARCHAR(255) NOT NULL,
        pan           VARCHAR(10)  NOT NULL,
        gst_num       VARCHAR(15),
        created_at    TIMESTAMP    DEFAULT NOW()
      );
    `);
    console.log('DB tables ready');
  } catch (err) {
    console.error('DB setup failed:', err.message);
  }
}

setupDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`LogiEdge backend running on port ${PORT}`));
