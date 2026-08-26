import SummaryCard from "./SummaryCard";
import { Target, TrendingDown, TrendingUp, Wallet } from "lucide-react";

const SummaryCards = ({ dashboardData }) => {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-4">

            <SummaryCard
                title="Current Balance"

                value={`₹${dashboardData?.currentBalance?.toLocaleString("en-IN") ?? "0"}`}
                valueColor="text-green-500"
                icon={
                    <Wallet className="text-green-600" />
                }
                iconBgColor="bg-green-100"
            />


            <SummaryCard
                title="Total Income"
                value={`₹${dashboardData?.totalIncome?.toLocaleString("en-IN") ?? "0"}`}
                valueColor="text-blue-500"
                icon={
                    <TrendingUp className="text-blue-600" />
                }
                iconBgColor="bg-blue-100"
            />


            <SummaryCard
                title="Total Expense"
                value={`₹${dashboardData?.totalExpense?.toLocaleString("en-IN") ?? "0"}`}
                valueColor="text-red-500"
                icon={
                    <TrendingDown className="text-red-600" />
                }
                iconBgColor="bg-red-100"
            />


            <SummaryCard
                title="Budget Left"
                value={`₹${dashboardData?.remainingBudget?.toLocaleString("en-IN") ?? "0"}`}
                valueColor="text-yellow-500"
                icon={
                    <Target className="text-yellow-600" />
                }
                iconBgColor="bg-yellow-100"
            />

        </div>
    );
};

export default SummaryCards;