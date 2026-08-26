import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenseCategories } from "../../../services/categoryService";
import { deleteBudget, getBudgets } from "../../../services/budgetService";
import PageHeader from "../../reuseable components/PageHeader";
import { Eye, Pencil, Plus, SlidersHorizontal, Trash2 } from "lucide-react";
import ConfirmModal from "../../reuseable components/ConfirmModal";
import ErrorSuccessBox from "../../reuseable components/ErrorSuccessBox";

const BudgetList = () => {

  const navigate = useNavigate();

  const messageRef = useRef(null);

  const [budgets, setbudgets] = useState([]);
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [filterButton, setfilterButton] = useState(false);

  const [totalPages, settotalPages] = useState(0);

  const [filters, setfilters] = useState({
    page: 0,
    size: 10,
    sortBy: "month",
    sortDir: "desc",

    categoryId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [categories, setcategories] = useState([]);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
  const years = Array.from(
    { length: 5 },
    (_, index) => new Date().getFullYear() - 2 + index
  );

  // Fetch Categories
  const fetchCategories = async () => {
    try {

      const response = await getExpenseCategories();

      setcategories(response);

      return response;

    } catch (error) {

      console.error("Failed to fetch categories:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to fetch categories."
      );

      return [];

    }

  };

  useEffect(() => {

    fetchCategories();

  }, []);

  // Fetch Budgets
  const fetchBudgets = async () => {

    try {

      setloading(true);
      seterror("");

      const response = await getBudgets(filters);

      setbudgets(response.content || []);
      settotalPages(response.totalPages || 0);

    } catch (error) {

      console.error("Failed to fetch budgets:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to fetch budgets."
      );

      setbudgets([]);

    } finally {

      setloading(false);

    }

  };

  useEffect(() => {

    fetchBudgets();

  }, [
    filters.page,
    filters.size,
    filters.sortBy,
    filters.sortDir,
    filters.categoryId,
    filters.month,
    filters.year,
  ]);

  // Format Amount
  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // Delete Budget
  const handleDelete = async () => {

    try {

      setDeleting(true);

      await deleteBudget(selectedBudgetId);

      setsuccess("Budget deleted successfully.");

      messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

      setTimeout(() => {
        setsuccess("");
      }, 1000);

      setShowDeleteModal(false);
      setSelectedBudgetId(null);

      fetchBudgets();

    } catch (error) {

      console.error("Failed to delete budget:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to delete budget."
      );

      messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

    } finally {

      setDeleting(false);

    }

  };

  return (

    <div className="w-full min-h-screen">

      {/* Page Header */}
      <PageHeader
        title="Budgets"
        subtitle="Manage and track all your budgets."
      >

        <button
          onClick={() => navigate("/budgets/add")}
          title="Add budget"
          className=" flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition whitespace-nowrap text-sm sm:text-base"
        >

          <Plus size={18} />

          Add Budget

        </button>

      </PageHeader>

      {/* Error / Success */}
      <div>
        <ErrorSuccessBox error={error} success={success} />
      </div>

      {/* Filter Button */}
      <div className='relative w-full h-12'>

        <button
          title="Filter budgets"
          className='absolute right-3 p-1 border border-gray-300 dark:border-gray-500 rounded-md bg-gray-100 dark:bg-gray-700'
          onClick={() => setfilterButton(!filterButton)}
        >

          <SlidersHorizontal sm:size={28} className='text-black dark:text-white' />

        </button>

      </div>

      {/* Filters */}
      {filterButton && (

        <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-5 mb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Category */}
            <div>

              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                Category
              </label>

              <select
                className=" w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                value={filters.categoryId}
                onChange={(e) =>
                  setfilters((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                    page: 0,
                  }))
                }
              >
                <option value="">All Categories</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                Month
              </label>

              <select
                className=" w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                value={filters.month}
                onChange={(e) =>
                  setfilters((prev) => ({
                    ...prev,
                    month: e.target.value,
                    page: 0,
                  }))
                }
              >
                <option value="">Select Month</option>

                {months.map((month) => (
                  <option
                    key={month.value}
                    value={month.value}
                  >
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                Year
              </label>

              <select
                className=" w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                value={filters.year}
                onChange={(e) =>
                  setfilters((prev) => ({
                    ...prev,
                    year: e.target.value,
                    page: 0,
                  }))
                }
              >
                <option value="">Select Year</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

      )}

      {/* Budget Table */}
      {!loading && budgets.length === 0 ? (
        <div
          className=" text-center  py-16 px-4"
        >
          <p className=" text-xl  sm:text-2xl  font-semibold  text-gray-700 dark:text-gray-200  text-center">
            No budgets found.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Try changing your filters or add a new budget.
          </p>

        </div>
      ) : (
        <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 overflow-hidden">

          {/* Responsive Table */}
          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-187.5 bg-white dark:bg-gray-950">

              {/* Table Header */}
              <thead className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white">

                <tr>

                  <th className="text-left px-4 sm:px-6 py-4 whitespace-nowrap">
                    Category
                  </th>

                  <th className="text-left px-4 sm:px-6 py-4 whitespace-nowrap">
                    Budget
                  </th>

                  <th className="text-left px-4 sm:px-6 py-4 whitespace-nowrap">
                    Spent
                  </th>

                  <th className="text-left px-4 sm:px-6 py-4 whitespace-nowrap">
                    Remaining
                  </th>

                  <th className="text-left px-4 sm:px-6 py-4 whitespace-nowrap">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500 dark:text-gray-200"
                    >
                      Loading...
                    </td>

                  </tr>

                ) : (

                  budgets.map((budget) => (
                    
                    <tr
                      key={budget.id}
                      className="text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-950 border-t border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 last:border-b"
                    >

                      {/* Category */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {budget.category}
                      </td>

                      {/* Budget */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {formatAmount(budget.monthlyLimit)}
                      </td>

                      {/* Spent */}
                      <td className="px-4 sm:px-6 py-4 text-red-500 font-semibold whitespace-nowrap">
                        {formatAmount(budget.spent)}
                      </td>

                      {/* Remaining */}
                      <td
                        className={`
                        px-4 sm:px-6 py-4
                        whitespace-nowrap
                        ${budget.remaining < 0
                            ? "text-red-500 font-semibold"
                            : "text-green-500 font-semibold"
                          }
                      `}
                      >
                        {formatAmount(budget.remaining)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 sm:px-6 py-4">

                        <div className="flex items-center gap-8 sm:gap-12 text-nowrap">

                          <button
                            title="View"
                            onClick={() =>
                              navigate(
                                `/budgets/${budget.id}`
                              )
                            }
                          >
                            <Eye size={24} />
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/budgets/edit/${budget.id}`
                              )
                            }
                          >
                            <Pencil size={24} />
                          </button>

                          <button
                            title="Delete"
                            onClick={() => {
                              setSelectedBudgetId(budget.id);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 size={24} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex items-center justify-center gap-3  mt-5 mb-5 px-4">
              
              <button
                disabled={filters.page === 0}
                onClick={() =>
                  setfilters((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                className="sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Previous
              </button>

              <span className="text-gray-900 dark:text-gray-400 font-semibold text-sm sm:text-base text-nowrap">
                Page {filters.page + 1} of {totalPages}
              </span>

              <button
                disabled={
                  totalPages === 0 ||
                  filters.page === totalPages - 1
                }
                onClick={() =>
                  setfilters((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                className="sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          )}

          {/* Delete Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Budget"
            message="Are you sure you want to delete this budget? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => {
              setShowDeleteModal(false);
              setSelectedBudgetId(null);
            }}
            loading={deleting}
            buttonText="Delete Budget"
            onLoadingButtonText="Deleting Budget..."
          />

        </div>

      )}

    </div>
  );
};

export default BudgetList;