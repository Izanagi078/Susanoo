# Susanoo — Full-Stack Financial Dashboard & Expense Tracker

A modern, highly responsive, and feature-rich personal finance management dashboard built on the **MERN (MongoDB, Express, React, Node.js)** stack. It empowers users to track income, categorize expenses, visualize spending behaviors with interactive heatmaps/charts, and export historical financial data to spreadsheets.

---

## 🚀 Key Technical Features

* **Type-Safe Request Validation (Zod)**: Intercepts and parses incoming REST API requests using strong Zod schemas in [validationSchemas.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/middleware/validationSchemas.js), enforcing numerical boundaries (e.g. positive amounts), email string validations, and sanitizing payloads.
* **🛡️ API DDoS Protection (Rate Limiting)**: Integrates `express-rate-limit` inside [server.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/server.js#L12) to throttle inbound client traffic to 200 requests per 15-minute window per IP, preventing scraper/bot spamming.
* **Memory-Safe Excel Streaming**: Refactored spreadsheet downloads in [incomeController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/incomeController.js#L52) to compile Excel binary worksheets directly in RAM buffers using `xlsx.write`. The buffer is streamed back via HTTP headers, eliminating disk write-locking and file-race conditions on ephemeral cloud servers.
* **Authoritative Dashboard Aggregations**: Performs real-time financial calculations (net balance, running totals, 30/60-day aggregations) directly inside MongoDB Atlas using optimized `$match` and `$group` aggregation pipelines in [dashboardController.js](file:///c:/Users/Lenovo/OneDrive/Desktop/Susanoo/Backend/controllers/dashboardController.js).
* **Granular Visual Analytics**: Integrates dynamic data charts (using `Recharts` and `Chart.js`) and GitHub-style financial calendar heatmaps (`react-calendar-heatmap`) to help users track entry frequency and spending patterns.
* **Secure Session Management**: Employs password cryptography (utilizing `Argon2` and `Bcrypt` fallbacks) and industry-standard JWT (JSON Web Tokens) authentication for secure stateless session validation.
* **Asynchronous File Handling**: Handles profile image uploads asynchronously using `Multer` on the backend, processing form-data multi-part files.
* **Fluid UI Design**: Engineered with a sleek, responsive design using **Tailwind CSS v4** and customized interactive icons (`React Icons`).

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
