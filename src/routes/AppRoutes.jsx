import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import PublicRoute from './PublicRoute'
import Login from '../components/pages/auth/Login'
import Register from '../components/pages/auth/Register'
import ForgotPassword from '../components/pages/auth/ForgotPassword'
import ResetPassword from '../components/pages/auth/ResetPassword'

import ProtectedRoute from './ProtectedRoute'
import Layout from '../components/layout/Layout'
import Dashboard from '../components/pages/dashboard/Dashboard'
import Profile from '../components/pages/profile/Profile'

import NotFound from '../components/pages/NotFound'
import AddExpense from '../components/pages/expense/AddExpense'
import ExpenseList from '../components/pages/expense/ExpenseList'
import ViewExpense from '../components/pages/expense/ViewExpense'
import IncomeList from '../components/pages/income/IncomeList'
import ViewIncome from '../components/pages/income/ViewIncome'
import AddIncome from '../components/pages/income/AddIncome'
import BudgetList from '../components/pages/budget/BudgetList'
import AddBudget from '../components/pages/budget/AddBudget'
import ViewBudget from '../components/pages/budget/ViewBudget'
import Reports from '../components/pages/report/Reports'
import OAuth2Redirect from '../components/pages/auth/OAuth2Redirect'



const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* Redirect root to login */}
                <Route path='/' element={<Navigate to={'/login'} replace />} />


                {/* ================= Public Routes ================= */}
                <Route element={<PublicRoute />} >

                    <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />

                </Route>


                {/* ================= Protected Routes ================= */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route path='/dashboard' element={<Dashboard />} />


                        <Route path="/expenses" element={<ExpenseList />} />

                        <Route path="/expenses/add" element={<AddExpense />} />

                        <Route path="/expenses/edit/:id" element={<AddExpense />} />

                        <Route path='/expenses/:id' element={<ViewExpense />} />


                        <Route path="/incomes" element={<IncomeList />} />

                        <Route path="/incomes/add" element={<AddIncome />} />

                        <Route path="/incomes/edit/:id" element={<AddIncome />} />

                        <Route path='/incomes/:id' element={<ViewIncome />} />


                        <Route path="/budgets" element={<BudgetList />} />

                        <Route path="/budgets/add" element={<AddBudget />} />

                        <Route path="/budgets/edit/:id" element={<AddBudget />} />

                        <Route path='/budgets/:id' element={<ViewBudget />} />


                        <Route path="/reports" element={<Reports />} />


                        <Route path="/profile" element={<Profile />} />

                    </Route>

                </Route>


                {/* 404 Page  */}
                <Route path='*' element={<NotFound />} />

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;