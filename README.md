# 💰 Smart Expense Tracker — Frontend

A modern, responsive personal finance management frontend built with **React.js** and **Tailwind CSS**.

Smart Expense Tracker allows users to manage their income, expenses, budgets and financial reports through an intuitive dashboard.

The frontend communicates with a secure Spring Boot REST API for authentication, financial data management and analytics.


## 🚀 Live Application

🔗 Live Demo: https://smart-expense-tracker-frontend-5z24.vercel.app/login

🔗 Backend Repository: https://github.com/aayush240805/smart-expense-tracker-backend

✨ Features

🔐 Authentication

- User login and registration
- JWT-based authentication
- Google OAuth 2.0 login
- Protected routes
- Automatic authentication handling
- Logout functionality

📊 Dashboard

The dashboard provides a quick overview of the user's finances:

- Current balance
- Total income
- Total expenses
- Remaining budget
- Income vs Expense chart
- Expense category distribution
- Recent transactions
- Quick actions

💸 Expense Management

- Add expenses
- Edit expenses
- View expense details
- Delete expenses
- Search expenses
- Filter by category
- Filter by payment method
- Filter by date range
- Pagination

💰 Income Management

- Add income
- Edit income
- View income details
- Delete income
- Search and filter income
- Pagination

🎯 Budget Management

- Create monthly budgets
- Category-based budgets
- View budget limits
- Track spending
- View remaining budget
- Monitor budget utilization

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

📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The sidebar and dashboard layout automatically adapt to different screen sizes.

🌙 Dark Mode


🛠️ Tech Stack

Frontend

- React.js
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React
- React Icons

Backend Integration

- REST APIs
- JWT Authentication
- Google OAuth 2.0
- JSON-based API communication


📂 Project Structure

smart-expense-tracker-frontend/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── api/
│   │   └── axios.js
│   │
│   ├── assets/
│   │   └── logo.png
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── OAuth2Redirect.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   ├── SummaryCards.jsx
│   │   │   │   ├── SummaryCard.jsx
│   │   │   │   ├── QuickActions.jsx
│   │   │   │   ├── RecentTransactions.jsx
│   │   │   │   ├── TransactionTable.jsx
│   │   │   │   ├── IncomeExpenseChart.jsx
│   │   │   │   └── ExpenseCategoryChart.jsx
│   │   │   │
│   │   │   ├── expense/
│   │   │   │   ├── Expense.jsx
│   │   │   │   ├── ExpenseList.jsx
│   │   │   │   ├── AddExpense.jsx
│   │   │   │   └── ViewExpense.jsx
│   │   │   │
│   │   │   ├── income/
│   │   │   │   ├── Income.jsx
│   │   │   │   ├── IncomeList.jsx
│   │   │   │   ├── AddIncome.jsx
│   │   │   │   └── ViewIncome.jsx
│   │   │   │
│   │   │   ├── budget/
│   │   │   │   ├── Budget.jsx
│   │   │   │   ├── BudgetList.jsx
│   │   │   │   ├── AddBudget.jsx
│   │   │   │   └── ViewBudget.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   ├── report/
│   │   │   │   └── Reports.jsx
│   │   │   │
│   │   │   └── NotFound.jsx
│   │   │
│   │   └── reuseable components/
│   │       ├── ConfirmModal.jsx
│   │       ├── ErrorSuccessBox.jsx
│   │       └── PageHeader.jsx
│   │
│   ├── context/
│   │   ├── AuthProvider.jsx
│   │   └── ThemeProvider.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── expenseService.js
│   │   ├── incomeService.js
│   │   ├── budgetService.js
│   │   ├── categoryService.js
│   │   ├── dashboardService.js
│   │   ├── profileService.js
│   │   ├── reportService.js
│   │   └── tokenValidate.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
└── README.md
