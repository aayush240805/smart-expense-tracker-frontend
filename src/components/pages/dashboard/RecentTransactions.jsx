import { useState } from "react";
import TransactionTable from "./TransactionTable";

const RecentTransactions = ({ dashboardData }) => {

    const recentTransactions = dashboardData?.recentTransactions;
    const allTransactions = dashboardData?.allTransactions;

    const [showAllTransactions, setshowAllTransactions] = useState(false);

    return (

        <div className="bg-white dark:bg-black dark:text-white rounded-xl border border-gray-200 dark:border-gray-500 shadow-sm px-3 sm:px-4 mt-4 sm:mt-6 mx-3 sm:mx-4 p-3 sm:p-4
        ">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">

                <h2 className="text-lg sm:text-xl font-semibold">
                    Recent Transactions
                </h2>


                <button
                    className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium whitespace-nowrap"
                    onClick={() => setshowAllTransactions(!showAllTransactions)}
                >
                    View All
                </button>

            </div>

            {/* Transactions */}
            {showAllTransactions
                ? (
                    <TransactionTable transactions={allTransactions} />
                ) : (
                    <TransactionTable transactions={recentTransactions} />
                )
            }

        </div>
    );
};

export default RecentTransactions;