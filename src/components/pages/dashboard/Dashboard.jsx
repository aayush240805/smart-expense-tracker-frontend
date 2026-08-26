import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import IncomeExpenseChart from "./IncomeExpenseChart";
import ExpenseCategoryChart from "./ExpenseCategoryChart";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickActions";
import { getDashhboard } from "../../../services/dashboardService";

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState(null);

    const fetchDashboard = async () => {

        try {

            const today = new Date();

            const month = today.getMonth() + 1;
            const year = today.getFullYear();

            const data = await getDashhboard(month, year);

            setDashboardData(data);

        } catch (error) {

            console.error(
                "Failed to fetch dashboard data.",
                error
            );

        }
    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    return (

        <div className="w-full min-h-screen 
        ">

            <DashboardHeader />

            <SummaryCards
                dashboardData={dashboardData}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6 px-3 sm:px-4">

                <IncomeExpenseChart
                    dashboardData={dashboardData}
                />

                <ExpenseCategoryChart
                    dashboardData={dashboardData}
                />

            </div>

            <RecentTransactions
                dashboardData={dashboardData}
            />

            <QuickActions />

        </div>

    );

};

export default Dashboard;