import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBudgetById } from "../../../services/budgetService";
import { BiMoney } from "react-icons/bi";
import { MdSavings } from "react-icons/md";
import PageHeader from "../../reuseable components/PageHeader";
import ErrorSuccessBox from "../../reuseable components/ErrorSuccessBox";

const ViewBudget = () => {

  const { id } = useParams();

  const [budget, setbudget] = useState(null);

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");


  // Fetch Budget
  const fetchBudget = async () => {

    try {

      setloading(true);
      seterror("");

      const data = await getBudgetById(id);

      setbudget(data);

    } catch (error) {

      console.error(
        "Failed to fetch budget:",
        error
      );

      seterror(
        error.response?.data?.message ||
        "Failed to load budget."
      );

    } finally {

      setloading(false);

    }

  };

  useEffect(() => {

    fetchBudget();

  }, [id]);


  // Loading
  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500 dark:text-gray-200">
          Loading budget...
        </p>
      </div>
    );
  }

  // Error
  <ErrorSuccessBox error={error} />

  // Not Found
  if (!budget) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500 dark:text-gray-200">
          Budget not found.
        </p>
      </div>
    );
  }


  // Month Format
  const formattedMonth =
    budget.month && budget.year
      ? new Intl.DateTimeFormat(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      ).format(
        new Date(
          Number(budget.year),
          Number(budget.month) - 1
        )
      )
      : "N/A";


  // Loading
    if (loading) {
        return (
            <div className="p-4 sm:p-6">
                <p className="text-gray-500">
                    Loading expense...
                </p>
            </div>
        );
    }

    // Error
    <ErrorSuccessBox error={error} />

    // Not found
    if (!budget) {
        return (
            <div className="p-4 sm:p-6">
                <p className="text-gray-500">
                    Expense not found.
                </p>
            </div>
        );
    }

  return (
    <div className="w-full p-4 sm:p-6">

      {/* Header */}
      <PageHeader
        title={"Budget Details"}
        subtitle={"View complete information about this budget."}
        showBackButton={true}
      />

      {/* Budget Card */}
      <div className=" bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-5 sm:p-6 w-full max-w-3xl">

        {/* Category */}
        <div className="mb-6">

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Category
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-1 wrap-break-word">
            {budget.category}
          </h2>

        </div>

        {/* Budget */}
        <div className="mb-6">

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Budget
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-blue-500 mt-1">
            ₹
            {Number(
              budget.monthlyLimit || 0
            ).toLocaleString("en-IN")}
          </p>

        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          {/* Spent */}
          <div className="flex items-start gap-3">

            <div className="p-2 bg-blue-100 rounded-lg shrink-0">

              <BiMoney
                size={20}
                className="text-blue-600"
              />

            </div>

            <div className="min-w-0">

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Spent
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                ₹
                {Number(
                  budget.spent || 0
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

          {/* Remaining */}
          <div className="flex items-start gap-3">

            <div className="p-2 bg-purple-100 rounded-lg shrink-0">

              <MdSavings
                size={20}
                className="text-purple-600"
              />

            </div>

            <div className="min-w-0">

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remaining
              </p>

              <p
                className={`font-medium wrap-break-word
                  ${Number(
                  budget.remaining || 0
                ) < 0
                    ? "text-red-500"
                    : "text-green-500"
                  }
                `}
              >
                ₹
                {Number(
                  budget.remaining || 0
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

          {/* Month */}
          <div className="flex items-start gap-3">

            <div className="p-2 bg-green-100 rounded-lg shrink-0">

              <Calendar
                size={20}
                className="text-green-600"
              />

            </div>

            <div className="min-w-0">

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Month
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                {formattedMonth}
              </p>

            </div>

          </div>

        </div>

        {/* Dates */}
        <div className="border-t mt-8 pt-5 text-sm text-gray-600 dark:text-gray-200 wrap-break-word">

          <p>
            Created:{" "}
            {budget.createdAt
              ? new Date(
                budget.createdAt
              ).toLocaleString()
              : "N/A"}
          </p>

          <p className="mt-1">
            Last updated:{" "}
            {budget.updatedAt
              ? new Date(
                budget.updatedAt
              ).toLocaleString()
              : "N/A"}
          </p>

        </div>

      </div>

    </div>

  );
};

export default ViewBudget;