import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getIncomeCategories } from '../../../services/categoryService';
import { createIncome, getIncomeById, updateIncome } from '../../../services/incomeService';
import PageHeader from '../../reuseable components/PageHeader';
import ErrorSuccessBox from '../../reuseable components/ErrorSuccessBox';

const AddIncome = () => {

    const navigate = useNavigate();

    const messageRef = useRef(null);

    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [formData, setformData] = useState({
        title: "",
        amount: "",
        categoryId: "",
        paymentMethod: "",
        incomeDate: new Date().toISOString().split("T")[0],
        description: ""
    });

    const [categories, setcategories] = useState([]);

    const [loading, setloading] = useState(false);

    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");


    // Fetch Categories
    const fetchCategories = async () => {

        try {

            const response = await getIncomeCategories();

            setcategories(response);

            return response;

        } catch (error) {

            console.error(
                "Failed to fetch categories:",
                error
            );

            seterror("Failed to fetch categories.");

            return [];

        }

    };


    // Fetch Income For Editing
    const fetchIncome = async (categoryList) => {

        try {

            setloading(true);

            const income = await getIncomeById(id);

            const selectedCategory = categoryList.find(
                category =>
                    category.name === income.category
            );


            setformData({
                title: income.title || "",

                amount: income.amount || "",

                categoryId: selectedCategory
                    ? selectedCategory.id
                    : "",

                paymentMethod:
                    income.paymentMethod || "",

                incomeDate:
                    income.incomeDate || "",

                description:
                    income.description || ""
            });

        } catch (error) {

            console.error(
                "Failed to fetch income:",
                error
            );

            seterror("Failed to fetch income.");

            navigate("/incomes");

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

                await fetchIncome(categoryList);

            }

        };

        initializePage();

    }, [id]);


    // Handle Input Changes
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

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
                                
                messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

                setloading(false);

                return;

            }


            if (isEditMode) {

                await updateIncome(id, formData);

                setsuccess("Income updated successfully.");

                messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

            } else {

                await createIncome(formData);

                setsuccess("Income added successfully.");

                messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

            }

            setTimeout(() => {

                navigate("/incomes");

            }, 1000);


        } catch (error) {

            console.error(error);

            const errors = error.response?.data;

            if (isEditMode) {

                seterror("Failed to update income.");

                messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

            } else {

                seterror(errors?.title || errors?.amount || errors?.categoryId || errors?.message ||
                    "Failed to add income."
                );

                messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

            }

        } finally {

            setloading(false);

        }

    };


    return (
        <>

            {/* Page Header */}
            <PageHeader
                title={
                    isEditMode
                        ? "Edit Income"
                        : "Add Income"
                }
                subtitle={
                    isEditMode
                        ? "Update your income details."
                        : "Record a new income."
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
                        Loading income...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit}>

                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

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
                                    placeholder="Enter income title"
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

                                    {categories.map(
                                        (category) => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* Payment Method */}
                            <div>

                                <label
                                    className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
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


                            {/* Income Date */}
                            <div>

                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                                    Income Date
                                </label>

                                <input
                                    type="date"
                                    name="incomeDate"
                                    value={formData.incomeDate}
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
                            <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4 sm:mt-8">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(-1)
                                    }
                                    className="w-full sm:w-auto px-6 py-3 text-black dark:text-white bg-white dark:bg-black border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    title={isEditMode ? "Update income" : "Save income"}
                                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Saving..."
                                        : isEditMode
                                            ? "Update Income"
                                            : "Save Income"
                                    }

                                </button>

                            </div>

                        </div>

                    </form>

                )}

            </div>

        </>
    )
}

export default AddIncome;