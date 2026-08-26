import { useEffect, useRef, useState } from 'react'
import PageHeader from '../../reuseable components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { getExpenseCategories } from '../../../services/categoryService';
import { createExpense, getExpenseById, updateExpense } from '../../../services/expenseService';
import ErrorSuccessBox from '../../reuseable components/ErrorSuccessBox';

const AddExpense = () => {

    const navigate = useNavigate();

    const messageRef = useRef(null);

    const [formData, setformData] = useState({
        title: "",
        amount: "",
        categoryId: "",
        paymentMethod: "",
        expenseDate: new Date().toISOString().split("T")[0],
        description: ""
    });

    const [categories, setcategories] = useState([]);

    const [loading, setloading] = useState(false);

    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");

    const { id } = useParams();

    const isEditMode = Boolean(id);

    // Fetch Categories
    const fetchCategories = async () => {

        try {

            const response = await getExpenseCategories();

            setcategories(response);

            return response;

        } catch (error) {

            console.error("Failed to fetch categories:", error);

            seterror("Failed to fetch categories.");

            return [];

        }

    };


    // Fetch Expense to edit
    const fetchExpense = async (categoryList) => {

        try {

            setloading(true);

            const expense = await getExpenseById(id);

            const selectedCategory = categoryList.find(
                category => category.name === expense.category
            );

            setformData({
                title: expense.title || "",
                amount: expense.amount || "",
                categoryId: selectedCategory
                    ? selectedCategory.id
                    : "",
                paymentMethod: expense.paymentMethod || "",
                expenseDate: expense.expenseDate || "",
                description: expense.description || ""
            });

        } catch (error) {

            console.error("Failed to fetch expense:", error);

            seterror("Failed to fetch expense.");

            navigate("/expenses");

        } finally {

            setloading(false);

        }

    };


    // Initial Setup
    useEffect(() => {

        const initializePage = async () => {

            const categoryList = await fetchCategories();

            if (isEditMode) {
                await fetchExpense(categoryList);
            }

        };

        initializePage();

    }, [id]);


    // Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setformData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        seterror("");
        setsuccess("");

        try {

            setloading(true);

            if (!formData.paymentMethod.trim()) {

                seterror("Payment Method is required.");

                messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

                setloading(false);

                return;
            }

            if (isEditMode) {

                await updateExpense(id, formData);

                setsuccess("Expense updated successfully.");

                messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

            } else {

                await createExpense(formData);

                setsuccess("Expense added successfully.");

                messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

            }

            setTimeout(() => {

                navigate("/expenses");
                
            }, 1000);

        } catch (error) {

            console.error(error);

            const errors = error.response?.data;

            if (isEditMode) {

                seterror("Failed to update expense.");

                messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

            } else {

                seterror(errors?.title || errors?.amount || errors?.categoryId || errors?.message ||
                    "Failed to add expense."
                );

                messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

            }


        } finally {

            setloading(false);

        }

    };


    return (
        <div className="w-full">

            {/* Page Header */}
            <PageHeader
                title={isEditMode ? "Edit Expense" : "Add Expense"}
                subtitle={
                    isEditMode
                        ? "Update your expense details."
                        : "Record a new expense."
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
                        Loading expense...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                            {/* Title */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter expense title"
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                />

                            </div>


                            {/* Amount */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    min="1"
                                    step="0.01"
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                />

                            </div>


                            {/* Category */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Category
                                </label>

                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
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


                            {/* Payment Method */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Payment Method
                                </label>

                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                >

                                    <option value="">
                                        Select Payment Method
                                    </option>

                                    <option value="CASH">
                                        Cash
                                    </option>

                                    <option value="UPI">
                                        UPI
                                    </option>

                                    <option value="CARD">
                                        Card
                                    </option>

                                    <option value="BANK_TRANSFER">
                                        Bank Transfer
                                    </option>

                                </select>

                            </div>


                            {/* Expense Date */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Expense Date
                                </label>

                                <input
                                    type="date"
                                    name="expenseDate"
                                    value={formData.expenseDate}
                                    onChange={handleChange}
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                />

                            </div>


                            {/* Description */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write something..."
                                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-3 outline-none resize-y focus:ring-2 focus:ring-blue-500 focus:border-none"
                                />

                            </div>


                            {/* Buttons */}
                            <div
                                className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-3
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    disabled={loading}
                                    className="w-full sm:w-auto px-6 py-3 text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    title={isEditMode ? "Update expense" : "Save expense"}
                                    disabled={loading}
                                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >

                                    {loading
                                        ? "Saving..."
                                        : isEditMode
                                            ? "Update Expense"
                                            : "Save Expense"
                                    }

                                </button>

                            </div>

                        </div>

                    </form>

                )}

            </div>

        </div>
    )
}

export default AddExpense;