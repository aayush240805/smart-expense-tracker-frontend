import { PlusCircle, Target, Wallet } from "lucide-react";

import { TbReport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Add Expense",
            icon: <PlusCircle size={28} />,
            color: "bg-red-100 text-red-600",
            path: "/expenses/add",
        },
        {
            title: "Add Income",
            icon: <Wallet size={28} />,
            color: "bg-green-100 text-green-600",
            path: "/incomes/add",
        },
        {
            title: "Set Budget",
            icon: <Target size={28} />,
            color: "bg-blue-100 text-blue-600",
            path: "/budgets/add",
        },
        {
            title: "View Reports",
            icon: <TbReport size={28} />,
            color: "bg-yellow-100 text-yellow-600",
            path: "/reports",
        },
    ];


    return (

        <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-3 sm:p-5 lg:p-6 mx-3 sm:mx-4 mt-4 sm:mt-6">

            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                Quick Actions
            </h2>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

                {actions.map((action) => (

                    <button
                        key={action.title}
                        onClick={() =>
                            navigate(action.path)
                        }
                        className="flex flex-col items-center justify-center gap-2 sm:gap-4 p-3 sm:p-5 lg:p-6 rounded-xl border border-gray-300 dark:border-gray-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >

                        <div
                            className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full flex items-center justify-center ${action.color}`}
                        >
                            {action.icon}
                        </div>


                        <span className="font-medium text-gray-700 dark:text-gray-200 text-xs sm:text-base lg:text-base text-center
                        ">
                            {action.title}
                        </span>

                    </button>

                ))}

            </div>

        </div>
    );
};

export default QuickActions;