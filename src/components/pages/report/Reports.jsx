import { useEffect, useState } from "react";
import { getBudgetReport, getCategoryWiseExpenses, getMonthlyReport } from "../../../services/reportService";
import PageHeader from "../../reuseable components/PageHeader";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const Reports = () => {
  const currentDate = new Date();

  const [month, setmonth] = useState(currentDate.getMonth() + 1);
  const [year, setyear] = useState(currentDate.getFullYear());

  const [monthlyReport, setmonthlyReport] = useState(null);
  const [categoryWiseExpenses, setcategoryWiseExpenses] = useState([]);
  const [budgetReport, setbudgetReport] = useState([]);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  // Months
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Years
  const years = [];

  for (
    let i = currentDate.getFullYear() - 5;
    i <= currentDate.getFullYear();
    i++
  ) {
    years.push(i);
  }

  // Chart colors
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
  ];

  // Fetch Reports
  const fetchReports = async () => {

    try {

      setloading(true);
      seterror("");

      const [monthlyData, categoryData, budgetData] = await Promise.all([
        getMonthlyReport(month, year),
        getCategoryWiseExpenses(month, year),
        getBudgetReport(month, year),
      ]);

      setmonthlyReport(monthlyData);
      setcategoryWiseExpenses(categoryData || []);
      setbudgetReport(budgetData || []);

    } catch (error) {

      console.error("Failed to fetch reports:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to load reports."
      );

    } finally {

      setloading(false);

    }

  };

  useEffect(() => {

    fetchReports();

  }, [month, year]);

  // Format Currency
  const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);

  };

  return (
    <div className="w-full min-h-screen">

      {/* Page Header */}
      <PageHeader
        title="Financial Reports"
        subtitle="Analyze your income, expenses and budgets."
      />

      {/* Month / Year Filter */}
      <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-5 mb-5 sm:mb-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Month */}
          <div className="w-full">

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-2">
              Month
            </label>

            <select
              value={month}
              onChange={(e) => setmonth(Number(e.target.value))}
              className="w-full border text-black dark:text-white bg-white dark:bg-black border-gray-300 dark:border-gray-500 rounded-lg px-3 sm:px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
            >
              {months.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="w-full">

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-2">
              Year
            </label>

            <select
              value={year}
              onChange={(e) => setyear(Number(e.target.value))}
              className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-3 sm:px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white dark:bg-black rounded-xl border border-gray-200 py-10 px-4 text-center text-gray-500 dark:text-gray-200 mb-6">
          Loading reports...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 sm:mb-6 text-sm">
          {error}
        </div>
      )}

      {!loading && monthlyReport && (
        <>
          {/* ================= MONTHLY SUMMARY ================= */}
          <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-6 mb-5 sm:mb-6">
            
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              Monthly Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5">

              {/* Income */}
              <div className="border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5">

                <p className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                  Total Income
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-green-500 mt-2 wrap-break-word">
                  {formatCurrency(monthlyReport.totalIncome)}
                </h3>

              </div>

              {/* Expense */}
              <div className="border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5">

                <p className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                  Total Expense
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-red-500 mt-2 wrap-break-word">
                  {formatCurrency(monthlyReport.totalExpense)}
                </h3>

              </div>

              {/* Saving */}
              <div className="border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5 sm:col-span-2 lg:col-span-1">

                <p className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                  Total Saving
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mt-2 wrap-break-word">
                  {formatCurrency(monthlyReport.totalSaving)}
                </h3>

              </div>

            </div>

          </div>

          {/* ================= CATEGORY-WISE EXPENSES ================= */}
          <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-6 mb-5 sm:mb-6">

            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-5 sm:mb-6">
              Category-wise Expenses
            </h2>

            {categoryWiseExpenses.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-600 font-semibold">
                  No expenses found for this month.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

                {/* Pie Chart */}
                <div className="w-full h-72 sm:h-80 lg:h-87.5 min-w-0">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={categoryWiseExpenses}
                        dataKey="totalSpent"
                        nameKey="category"
                        cx="50%"
                        cy="45%"
                        outerRadius="65%"
                        label={false}
                      >

                        {categoryWiseExpenses.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}

                      </Pie>

                      <Tooltip
                        formatter={(value) => formatCurrency(value)}
                      />

                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>

                  </ResponsiveContainer>

                </div>

                {/* Category List */}
                <div className="flex flex-col justify-center gap-3 sm:gap-4">

                  {categoryWiseExpenses.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-500 pb-3 last:border-b-0"
                    >

                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">

                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              COLORS[index % COLORS.length],
                          }}
                        />

                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">
                          {item.category}
                        </span>

                      </div>

                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base whitespace-nowrap">
                        {formatCurrency(item.totalSpent)}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* ================= BUDGET REPORT ================= */}
          <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-6">

            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-5 sm:mb-6">
              Budget Report
            </h2>

            {budgetReport.length === 0 ? (
              <div className="py-8 text-center">

                <p className="text-gray-600 font-semibold">
                  No budgets found for this month.
                </p>

              </div>
            ) : (
              <div className="space-y-5 sm:space-y-6">

                {budgetReport.map((item, index) => {
                  const percentageUsed =
                    Number(item.percentageUsed) || 0;

                  const percentage = Math.min(
                    Math.max(percentageUsed, 0),
                    100
                  );

                  const isExceeded = percentageUsed > 100;

                  return (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-500 pb-5 last:border-b-0"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">

                        <div className="flex items-center gap-3 min-w-0">

                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                COLORS[index % COLORS.length],
                            }}
                          />

                          <span className="font-medium text-gray-700 dark:text-gray-200 truncate">
                            {item.category}
                          </span>

                        </div>

                        <span
                          className={`font-semibold text-sm sm:text-base ${isExceeded
                              ? "text-red-500"
                              : "text-gray-700 dark:text-gray-200"
                            }`}
                        >
                          {percentageUsed}%
                        </span>

                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 sm:h-3 overflow-hidden">

                        <div
                          className={`h-full rounded-full transition-all duration-300 ${isExceeded
                              ? "bg-red-500"
                              : "bg-green-500"
                            }`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                        {/* Spent */}
                        <div className="bg-gray-100 dark:bg-[#141414] rounded-lg p-3">

                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-200">
                            Spent
                          </p>

                          <p className="font-semibold text-red-500 text-sm sm:text-base mt-1 wrap-break-word">
                            {formatCurrency(item.spent)}
                          </p>

                        </div>

                        {/* Budget */}
                        <div className="bg-gray-100 dark:bg-[#141414] rounded-lg p-3">

                          <p className="text-xs sm:text-sm text-blue-500 dark:text-gray-200">
                            Budget
                          </p>

                          <p className="font-semibold text-blue-500 text-sm sm:text-base mt-1 wrap-break-word">
                            {formatCurrency(item.monthlyLimit)}
                          </p>

                        </div>

                        {/* Remaining */}
                        <div className="bg-gray-100 dark:bg-[#141414] rounded-lg p-3">

                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-200">
                            Remaining
                          </p>

                          <p
                            className={`font-semibold text-sm sm:text-base mt-1 wrap-break-word ${Number(item.remaining) < 0
                                ? "text-red-500"
                                : "text-green-500"
                              }`}
                          >
                            {formatCurrency(item.remaining)}
                          </p>

                        </div>

                      </div>

                    </div>
                  );

                })}

              </div>

            )}

          </div>

        </>

      )}

    </div>
  );

};

export default Reports;