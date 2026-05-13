# 🔐 Password Manager — Full Stack App

A beginner-friendly full stack password manager built with **React + Vite** (frontend) and **Node.js + Express** (backend).

---

## 📁 Project Structure

```
password-manager/
├── frontend/                  # React Vite app (UI)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx           # Entry point
│       ├── App.jsx            # Root component + routes
│       ├── index.css          # Global styles
│       ├── components/
│       │   ├── Auth/          # Login, Register, ForgotPassword
│       │   ├── Dashboard/     # Sidebar, Header, Dashboard layout
│       │   ├── Vault/         # Password list, Add/Edit forms, Generator
│       │   └── UI/            # Reusable: Button, Input, Modal, SearchBar
│       ├── pages/             # Full page components (routed)
│       ├── hooks/             # Custom React hooks
│       ├── context/           # Auth & Vault global state
│       ├── services/          # API call functions
│       └── utils/             # Helpers: encryption, validators, strength checker
│
└── backend/                   # Node.js Express API
    └── src/
        ├── server.js          # Starts the server
        ├── app.js             # Express app setup
        ├── config/
        │   ├── db.js          # MongoDB/DB connection
        │   └── env.js         # Load environment variables
        ├── controllers/       # Business logic for each route
        ├── routes/            # API route definitions
        ├── middleware/        # Auth check, error handling, rate limiting
        ├── models/            # DB schemas (User, VaultEntry)
        └── utils/             # JWT helpers, encryption, logger
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB (local or Atlas)

### 1. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
node src/server.js
```

---

## 🔑 Key Features (to build)
- [ ] User registration & login with JWT
- [ ] AES-256 encrypted password storage
- [ ] Add, edit, delete vault entries
- [ ] Password strength checker
- [ ] Random password generator
- [ ] Search & filter passwords

---

## 📦 Tech Stack
| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React, Vite, Axios |
| Backend   | Node.js, Express   |
| Database  | MongoDB + Mongoose |
| Auth      | JWT + bcrypt       |
| Encryption| crypto-js / AES    |
