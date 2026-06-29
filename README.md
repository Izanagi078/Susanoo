# Susanoo — Full-Stack Financial Dashboard & Expense Tracker

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/Node.js-v20-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Vercel-Hosted-black?style=for-the-badge&logo=vercel)](https://final-two-hazel.vercel.app/)
[![Render](https://img.shields.io/badge/Render-Hosted-46e3b7?style=for-the-badge&logo=render)](https://susanoo.onrender.com)

**A secure, production-grade MERN stack personal finance dashboard.**

🌐 **[Live Client Application (Vercel)](https://final-two-hazel.vercel.app/)** &nbsp;•&nbsp; 🚀 **[Live Backend API (Render)](https://susanoo.onrender.com)**

</div>

---

## 🚀 Key Technical Features

* **Type-Safe Request Validation (Zod)**: Intercepts and validates incoming REST API requests using strict Zod schemas in [validationSchemas.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/middleware/validationSchemas.js), enforcing boundary checks (e.g. positive transaction amounts) and returning structured `400 Bad Request` messages to protect the database layer.
* **🛡️ API DDoS Protection (Rate Limiting)**: Integrates `express-rate-limit` inside [server.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/server.js#L12) to throttle client traffic to a maximum of 200 requests per 15 minutes per IP, mitigating scraper abuse and denial-of-service attempts.
* **Memory-Safe Excel Streaming**: Refactored transaction exports in [incomeController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/incomeController.js#L52) and [expenseController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/expenseController.js#L51) to generate spreadsheets as binary buffer arrays in RAM using `xlsx.write`. Streams worksheets directly to the client via HTTP response headers, preventing disk write conflicts and supporting stateless cloud containers.
* **Stateless Token Revocation (Secure Logouts)**: Implemented server-side logout validation in [SideMenu.jsx](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Frontend/ExpenseTracker/src/assets/components/Layouts/SideMenu.jsx#L14) that registers revoked JWTs in a MongoDB `RevokedToken` collection. A **MongoDB TTL (Time-To-Live) index** automatically purges expired tokens after 1 hour, preventing token-hijacking vulnerability.
* **Cloud-Safe Image Uploads (Base64)**: Overhauled `/upload-image` in [authRoutes.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/routes/authRoutes.js#L23) to read uploads, convert them to Base64 strings, and save them in MongoDB. Wipes local temporary files immediately, preventing image loss on ephemeral cloud containers.
* **Authoritative Dashboard Aggregations**: Performs real-time financial calculations (net balance, running totals, 30/60-day limits) directly inside MongoDB Atlas using optimized `$match` and `$group` aggregation pipelines in [dashboardController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/dashboardController.js).
* **High-Speed Database Indexing**: Added compound indexes on `{ userId: 1, date: -1 }` inside [Expense.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/models/Expense.js#L10) and [Income.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/models/Income.js#L10) to force fast B-Tree index scans.
* **ACID Transactions**: Wrapped creations and deletions in [expenseController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/expenseController.js#L4) and [incomeController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/incomeController.js#L4) inside atomic transaction blocks.
* **Fluid UI Design**: Engineered with a sleek, responsive design using **Tailwind CSS v4** and customized interactive graphs (`Recharts` and `Chart.js`) and calendar heatmaps.

---

## 📐 System Architecture

```
                 ┌───────────────────────────────────────┐
                 │          Vite + React SPA             │  (Hosted on Vercel)
                 │  (Tailwind v4 / Recharts / Heatmaps)  │
                 └──────────────────┬────────────────────┘
                                    │
                        JSON API    │   Multipart/FormData
                        Requests    │   File Uploads
                                    │
                 ┌──────────────────▼────────────────────┐
                 │         Express + Node.js API         │  (Hosted on Render)
                 │  (JWT Auth / Multer / xlsx Exporter)  │
                 └──────────────────┬────────────────────┘
                                    │
                                    │  Mongoose ODM
                                    │
                 ┌──────────────────▼────────────────────┐
                 │          MongoDB Atlas Cloud          │
                 │   (Match & Group Aggregation Pipe)    │
                 └───────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend (SPA)
* **React 19 & Vite**: Ultra-fast hot-module replacement and dynamic component rendering.
* **Recharts & Chart.js**: Fluid vector analytics charts.
* **react-calendar-heatmap**: Grid-based heatmap tracking transactional velocity.
* **Tailwind CSS v4**: Utility-first premium styling.

### Backend (REST API)
* **Node.js & Express**: High-concurrency async event-loop backend.
* **Mongoose ODM**: Structured object modeling schemas for MongoDB.
* **Argon2 & BcryptJS**: High-performance password hashing algorithm fallback wrappers.
* **SheetJS (XLSX)**: Server-side Microsoft Excel worksheet generation.
* **Multer**: Multi-part form-data file storage middleware.
* **Zod**: Declarative request schema validator.
* **express-rate-limit**: Route throttling middleware.

---

## 🚦 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed or have access to a MongoDB Atlas cluster.

### Setup Instructions

#### Step 1: Configure Backend Environment
Create a `.env` file inside the `Backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signature_secret
PORT=8000
```

#### Step 2: Install Backend Dependencies & Start Server
```bash
cd Backend
npm install
npm run dev
```

#### Step 3: Install Frontend Dependencies & Start App
```bash
cd ../Frontend/ExpenseTracker
npm install
npm run dev
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Izanagi078/Susanoo/issues) if you want to contribute.

## 📄 License

This project is licensed under the ISC License.
