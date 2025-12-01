```md
# 💰 Money Flow – Multi-User Personal Finance Dashboard

A full-stack finance tracking application built using the **MERN stack** with **JWT authentication**.  
Users can register/login and manage **their own personal transactions**, visualized interactively via charts and filters.

---

## 🚀 Live Dashboard Capabilities

- 🔐 Secure user **Register & Login**
- 🧾 Add **Income & Expense transactions**
- 🗂 Filter by **Date, Category, Amount, Type**
- 🔄 Sort transactions for deeper analysis
- 📊 Charts for:
  - Monthly Net Balance
  - Spending by Category
  - Income vs Expense Overview

---

## 🧠 Tech Stack Used

### **Frontend**
- ⚛ React (Vite)
- 🌐 Axios (API calls)
- 📈 Recharts (Data Visualization)

### **Backend**
- 🟢 Node.js
- ⚙ Express.js (REST APIs)
- 🍃 MongoDB + Mongoose (Schema/Data Storage)
- 🔏 JWT Authentication
- 🔑 bcrypt.js (Password Hashing)

---

## 📁 Project Structure

```

money-flow/
├── backend/
│   ├── config/db.js
│   ├── models/User.js
│   ├── models/Transaction.js
│   ├── routes/auth.js
│   ├── routes/transactions.js
│   ├── middleware/auth.js
│   ├── .env.example
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/AuthForm.jsx
│   │   ├── components/TransactionForm.jsx
│   │   ├── components/Filters.jsx
│   │   ├── components/TransactionTable.jsx
│   │   ├── components/DashboardCharts.jsx
│   │   ├── services/api.js
│   │   ├── styles.css
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
│
└── README.md

````

---

## ⚙ Setup & Installation

### 1️⃣ Backend

```bash
cd backend
npm install
cp .env.example .env
````

Edit `.env`:

```env
MONGO_URI=mongodb://localhost:27017/money_flow
PORT=5000
JWT_SECRET=replace_with_a_secure_random_string
JWT_EXPIRES_IN=7d
```

Run server:

```bash
npm run dev
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `localhost:5173`
Backend runs at `localhost:5000`

---

## 🧾 API Endpoints

| Method | Endpoint                | Description                                           |
| ------ | ----------------------- | ----------------------------------------------------- |
| POST   | `/api/auth/register`    | Register new account                                  |
| POST   | `/api/auth/login`       | Login and get JWT token                               |
| GET    | `/api/transactions`     | Get only logged-in user’s transactions (with filters) |
| POST   | `/api/transactions`     | Add transaction for logged-in user                    |
| PUT    | `/api/transactions/:id` | Update user transaction                               |
| DELETE | `/api/transactions/:id` | Delete user transaction                               |

> All `/transactions` routes require:
> `Authorization: Bearer <JWT_TOKEN>`

---

## ✅ User-Wise Data Behavior

* Each user gets **isolated transaction storage**
* No one can access another user's financial data
* Token is saved in `localStorage` after login
* Logout clears token and returns to Auth screen

---

## 🔥 Future Enhancements You Can Add

* 🔁 Refresh token support
* 📥 Export transactions (CSV / Excel)
* 📌 Recurring & budget reminders
* 📧 Email verification / Password reset

---

## 🤝 Contributing

Contributions are welcome!
Feel free to raise issues or submit pull requests.

---

⭐ If you like this project, don’t forget to star the repo!

```


Would you like me to generate those too? 😎
```
