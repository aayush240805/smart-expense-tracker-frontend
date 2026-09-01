# 💰 Smart Expense Tracker — Frontend

A modern, responsive personal finance management frontend built with **React.js** and **Tailwind CSS**.

Smart Expense Tracker allows users to manage their income, expenses, budgets and financial reports through an intuitive dashboard.

The frontend communicates with a secure Spring Boot REST API for authentication, financial data management and analytics.

---

## 🚀 Live Application

🔗 Live Demo: YOUR_FRONTEND_URL

🔗 Backend Repository: YOUR_BACKEND_REPOSITORY_URL

---

## ✨ Features

### 🔐 Authentication

- User login and registration
- JWT-based authentication
- Google OAuth 2.0 login
- Protected routes
- Automatic authentication handling
- Logout functionality

### 💸 Expense Management

- Add expenses
- Edit expenses
- View expense details
- Delete expenses
- Search expenses
- Filter by category
- Filter by payment method
- Filter by date range
- Pagination

### 💰 Income Management

- Add income
- Edit income
- View income details
- Delete income
- Search and filter income
- Pagination

### 🎯 Budget Management

- Create monthly budgets
- Category-based budgets
- View budget limits
- Track spending
- View remaining budget
- Monitor budget utilization

### 📊 Dashboard

The dashboard provides a quick overview of the user's finances:

- Current balance
- Total income
- Total expenses
- Remaining budget
- Income vs Expense chart
- Expense category distribution
- Recent transactions
- Quick actions

### 📈 Financial Reports

- Monthly financial summary
- Category-wise expense analysis
- Budget utilization report
- Spending percentage
- Remaining budget analysis

### 👤 Profile

- View profile
- Update profile information
- Change password
- Password validation
- Password change notification

### 📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The sidebar and dashboard layout automatically adapt to different screen sizes.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React
- React Icons

### Backend Integration

- REST APIs
- JWT Authentication
- Google OAuth 2.0
- JSON-based API communication

---

## 📂 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   └── UI/
│
├── context/
│   └── AuthProvider.jsx
│
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── expenses/
│   ├── incomes/
│   ├── budgets/
│   ├── reports/
│   └── profile/
│
├── services/
│   ├── authService.js
│   ├── dashboardService.js
│   ├── expenseService.js
│   ├── incomeService.js
│   ├── budgetService.js
│   ├── reportService.js
│   ├── profileService.js
│   └── categoryService.js
│
├── App.jsx
├── main.jsx
└── index.css
