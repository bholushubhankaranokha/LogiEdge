# 🚀 LogiEdge – Billing Dashboard

Full-stack **MVC-based billing system** built with:

* ⚛️ React (Frontend)
* 🌐 Node.js + Express (Backend)
* 🐘 PostgreSQL (Neon Cloud)

---

## 📂 Folder Structure

```
logiEdge/
├── backend/                      # Backend (MVC Architecture)
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection pool
│   │
│   ├── models/                  # Database queries (Model layer)
│   │   ├── customer.model.js
│   │   ├── item.model.js
│   │   └── invoice.model.js
│   │
│   ├── controllers/             # Business logic (Controller layer)
│   │   ├── customer.controller.js
│   │   ├── item.controller.js
│   │   └── invoice.controller.js
│   │
│   ├── routes/                  # API routes
│   │   ├── customer.routes.js
│   │   ├── item.routes.js
│   │   └── invoice.routes.js
│   │
│   ├── index.js                 # Entry point (Express app)
│   ├── .env                     # Environment variables (ignored)
│   ├── .env.example
│   └── package.json
│
└── frontend/                    # Frontend (View layer)
    ├── public/
    │   └── index.html
    │
    ├── src/
    │   ├── App.js               # Root component
    │   ├── index.js
    │   ├── index.css
    │   │
    │   ├── components/
    │   │   └── Card.js          # Reusable UI component
    │   │
    │   └── pages/
    │       ├── Dashboard.js
    │       ├── InvoiceDetails.js
    │       ├── MasterPage.js
    │       ├── BillingPage.js
    │       │
    │       ├── Master/
    │       │   ├── Customer.js
    │       │   ├── Items.js
    │       │   ├── AddCustomer.js
    │       │   └── AddItem.js
    │       │
    │       └── Billing/
    │           ├── CustomerDetails.js
    │           ├── SelectCustomer.js
    │           ├── BillingDetails.js
    │           ├── SelectItem.js
    │           ├── TotalBill.js
    │           └── FinalBill.js
    │
    ├── package.json
    └── vercel.json
```

---

## 🌐 Deployment 

### 🚀 Frontend - Vercel
### 🚀 Backend - Render
### 🛢️ Database - PostgreSQL hosted on Neon

---

## 📌 Features

* Customer Management
* Item Management
* Invoice Generation
* Dashboard Overview
* Dynamic Billing System
* REST API with Express
* Cloud Database Integration

---

## 👨‍💻 Author

**Bholu Shubhankar Anokha**
B.Tech AI & DS

LinkedIn: https://linkedin.com/in/bholushubhankaranokha

---

## ⭐ Contribution

Feel free to fork and contribute 🚀
