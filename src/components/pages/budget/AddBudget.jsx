import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseCategories } from "../../../services/categoryService";
import { createBudget, getBudgetById, updateBudget } from "../../../services/budgetService";
import PageHeader from "../../reuseable components/PageHeader";
import ErrorSuccessBox from "../../reuseable components/ErrorSuccessBox";

const AddBudget = () => {

  const navigate = useNavigate();

  const messageRef = useRef(null);

  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setformData] = useState({
    categoryId: "",
    monthlyLimit: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [categories, setcategories] = useState([]);

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

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


  // Fetch Budget For Edit
  const fetchBudget = async (categoryList) => {

    try {

      setloading(true);
      seterror("");

      const budget = await getBudgetById(id);

      const selectedCategory = categoryList.find(
        (category) =>
          category.name === budget.category
      );

      setformData({
        categoryId: selectedCategory
          ? selectedCategory.id
          : "",
        monthlyLimit: budget.monthlyLimit || "",
        month: budget.month || "",
        year: budget.year || "",
      });

    } catch (error) {

      console.error("Failed to fetch budget:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to load budget."
      );

      navigate("/budgets");

    } finally {

      setloading(false);

    }

  };

  // Initial Setup
  useEffect(() => {

    const initializePage = async () => {

      const categoryList =
        await fetchCategories();

      if (isEditMode) {
        await fetchBudget(categoryList);
      }

    };

    initializePage();

  }, [id]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));

    seterror("");
  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    seterror("");
    setsuccess("");

    try {

      setloading(true);

      if (isEditMode) {

        await updateBudget(id, formData);

        setsuccess("Budget updated successfully.");

        messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

      } else {

        await createBudget(formData);

        setsuccess("Budget added successfully.");

        messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

      }

      setTimeout(() => {

        navigate("/budgets");
        
      }, 1000);

    } catch (error) {

      console.error(error);

      const errors = error.response?.data;

      seterror(errors?.monthlyLimit || errors?.categoryId || errors?.message ||
        "Failed to add budget."
      );

      messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

    } finally {

      setloading(false);

    }
  };

  return (
    <div className="w-full">

      {/* Page Header */}
      <PageHeader
        title={
          isEditMode
            ? "Edit Budget"
            : "Add Budget"
        }
        subtitle={
          isEditMode
            ? "Update your budget details."
            : "Create a new monthly budget."
        }
        showBackButton={true}
      />

      {/* Error / Success */}
      <div ref={messageRef}>
        <ErrorSuccessBox error={error} success={success} />
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-500 shadow-sm p-4 sm:p-6 lg:p-8">

        {loading && isEditMode ? (
          
          <div className="text-center py-10 text-gray-500 dark:text-gray-200">
            Loading budget...
          </div>
        
      ) : (
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

              {/* Category */}
              <div>
                
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Category
                </label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full text-black dark:text-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                >
                  <option value="">
                    Select Category
                  </option>

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

              {/* Monthly Limit */}
              <div>
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Monthly Budget
                </label>

                <input
                  type="number"
                  name="monthlyLimit"
                  value={formData.monthlyLimit}
                  onChange={handleChange}
                  placeholder="Enter budget amount"
                  min="1"
                  step="0.01"
                  className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                />
              </div>

              {/* Month */}
              <div>
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Month
                </label>

                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                >
                  <option value="">
                    Select Month
                  </option>

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
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Year
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                >
                  <option value="">
                    Select Year
                  </option>

                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>

                  ))}

                </select>

              </div>
              
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 text-black dark:text-white bg-white dark:bg-black border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                title={isEditMode ? "Update budget" : "Save budget"}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Budget"
                    : "Save Budget"}
              </button>

            </div>

          </form>

        )}

      </div>

    </div>

  );

};

export default AddBudget;