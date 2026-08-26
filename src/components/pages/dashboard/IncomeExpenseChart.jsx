import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const IncomeExpenseChart = ({ dashboardData }) => {

    const data = [
        {
            name: "Income",
            amount: dashboardData?.totalIncome,
        },
        {
            name: "Expense",
            amount: dashboardData?.totalExpense,
        },
    ];

    console.log()

    return (

        <div className="bg-white dark:bg-black dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-500 shadow-sm p-3 sm:p-5 lg:p-6">

            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
                Income vs Expense
            </h2>

            {(Object.values(data)[0].amount || Object.values(data)[1].amount) > 0
                ? (

                    <div className="
                    w-full
                    h-70
                    sm:h-80
                    dark:text-black"
                    >

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 5,
                                    left: 0,
                                    bottom: 5
                                }}
                                
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="name"
                                    fontSize={12}
                                />

                                <YAxis
                                    fontSize={12}
                                />

                                <Tooltip
                                    formatter={(value) =>
                                        `₹${Number(value).toLocaleString("en-IN")}`
                                    }
                                />

                                <Bar
                                    dataKey="amount"
                                    radius={[8, 8, 0, 0]}
                                >

                                    <Cell fill="#10B981" />
                                    <Cell fill="#EF4444" />

                                </Bar>

                            </BarChart>

                        </ResponsiveContainer>

                    </div>


                ) : (

                    <div className="flex  items-center justify-center text-gray-500 text-sm w-full h-70 sm:h-80
                ">
                        No Incomes or Expenses found to analyse.
                    </div>
                )
            }

        </div>

    );

};

export default IncomeExpenseChart;