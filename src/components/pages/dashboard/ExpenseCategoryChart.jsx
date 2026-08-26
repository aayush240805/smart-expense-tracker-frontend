import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

const ExpenseCategoryChart = ({ dashboardData }) => {

    const data =
        dashboardData?.categoryExpenses || [];


    return (

        <div className="bg-white dark:bg-black dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-500 shadow-sm p-3 sm:p-5 lg:p-6">

            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
                Expense by Category
            </h2>

            {data?.length > 0
                ? (
                    <div className="w-full h-70 sm:h-80">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="totalSpent"
                                    nameKey="category"
                                    cx="50%"
                                    cy="45%"
                                    outerRadius="65%"
                                    label={false}
                                >

                                    {data.map((entry, index) => (

                                        <Cell
                                            key={entry.category}
                                            fill={
                                                COLORS[
                                                index % COLORS.length
                                                ]
                                            }
                                        />

                                    ))}

                                </Pie>


                                <Tooltip
                                    formatter={(value) =>
                                        `₹${Number(value).toLocaleString("en-IN")}`
                                    }
                                />


                                <Legend
                                    wrapperStyle={{
                                        fontSize: "12px"
                                    }}
                                />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>


                ) : (
                    <div className="flex  items-center justify-center text-gray-500 text-sm w-full h-70 sm:h-80">
                        No categories found to analyse.
                    </div>
                )
            }

        </div>
    );
};

export default ExpenseCategoryChart;