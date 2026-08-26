import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getIncomeCategories } from '../../../services/categoryService';
import { deleteIncome, getIncomes } from '../../../services/incomeService'
import PageHeader from '../../reuseable components/PageHeader';
import { Eye, Pencil, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import ConfirmModal from '../../reuseable components/ConfirmModal';
import ErrorSuccessBox from '../../reuseable components/ErrorSuccessBox';

const IncomeList = () => {

    const navigate = useNavigate();
    
    const messageRef = useRef(null);

    const [incomes, setincomes] = useState([]);
    const [loading, setloading] = useState(false);

    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");

    const [filterButton, setfilterButton] = useState(false);

    const [totalPages, settotalPages] = useState(0);

    const [filters, setfilters] = useState({
        page: 0,
        size: 10,
        sortBy: "incomeDate",
        sortDir: "desc",

        keyword: "",
        categoryId: "",
        paymentMethod: "",
        startDate: "",
        endDate: ""
    });

    const [categories, setcategories] = useState([]);

    // Delay API call while typing
    const [debouncedKeyword, setdebouncedKeyword] = useState("");

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIncomeId, setSelectedIncomeId] = useState(null);
    const [deleting, setDeleting] = useState(false);


    // Fetch Categories
    const fetchCategories = async () => {

        try {

            const response = await getIncomeCategories();

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


    // Fetch Incomes
    const fetchIncomes = async () => {

        try {

            setloading(true);

            const response = await getIncomes({
                ...filters,
                keyword: debouncedKeyword
            });

            setincomes(response.content || []);
            settotalPages(response.totalPages || 0);

        } catch (error) {

            console.error("Failed to fetch incomes:", error);

            seterror(
                error.response?.data?.message ||
                "Failed to fetch incomes."
            );

            setincomes([]);

        } finally {

            setloading(false);

        }

    };

    useEffect(() => {

        fetchIncomes();

    }, [
        filters.page,
        filters.size,
        filters.sortBy,
        filters.sortDir,
        debouncedKeyword,
        filters.categoryId,
        filters.paymentMethod,
        filters.startDate,
        filters.endDate
    ]);


    // Debounce Search
    useEffect(() => {

        const timer = setTimeout(() => {

            setdebouncedKeyword(filters.keyword);

        }, 500);

        return () => clearTimeout(timer);

    }, [filters.keyword]);


    // Delete Income
    const handleDelete = async () => {

        try {

            setDeleting(true);

            await deleteIncome(selectedIncomeId);

            setsuccess("Income deleted successfully.");

            messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

            setShowDeleteModal(false);
            setSelectedIncomeId(null);

            setTimeout(() => {
                setsuccess("");
            }, 1000);

            // Refresh list
            fetchIncomes();

        } catch (error) {

            console.error("Failed to delete income:", error);

            seterror(
                error.response?.data?.message ||
                "Failed to delete income."
            );

            messageRef.current?.scrollIntoView({behavior: "smooth", block: "center"});

        } finally {

            setDeleting(false);

        }

    };


    return (
        <div className='w-full min-h-screen'>

            {/* Page Header */}
            <PageHeader
                title="Incomes"
                subtitle="Manage and track all your incomes."
            >

                <button
                    onClick={() => navigate("/incomes/add")}
                    title='Add income'
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition whitespace-nowrap text-sm sm:text-base"
                >

                    <Plus size={18} />

                    Add Income

                </button>

            </PageHeader>


            {/* Error / Success */}
            <div ref={messageRef}>
                <ErrorSuccessBox error={error} success={success} />
            </div>

            {/* Filter Button */}
            <div className='relative w-full h-12'>

                <button 
                    title='Filter incomes'
                    className='absolute right-3 p-1 border border-gray-300 dark:border-gray-500 rounded-md bg-gray-100 dark:bg-gray-700'    
                    onClick={() => setfilterButton(!filterButton)}
                >

                    <SlidersHorizontal sm:size={28} className='text-black dark:text-white' />

                </button>
            </div>


            {/* Search & Filters */}
            {filterButton && (
                <div className=" bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-5 mb-6">

                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

                        {/* Search */}
                        <div>

                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                                Search Income
                            </label>

                            <div className="relative">

                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search income..."
                                    value={filters.keyword}
                                    onChange={(e) =>
                                        setfilters(prev => ({
                                            ...prev,
                                            keyword: e.target.value,
                                            page: 0,
                                        }))
                                    }
                                    className="w-full pl-10 pr-4 py-3 rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                />

                            </div>
                        </div>

                        {/* Category */}
                        <div>

                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                                Category
                            </label>

                            <select
                                className="w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                value={filters.categoryId}
                                onChange={(e) =>
                                    setfilters(prev => ({
                                        ...prev,
                                        categoryId: e.target.value,
                                        page: 0
                                    }))
                                }
                            >

                                <option value="">
                                    All Categories
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

                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                                Payment Method
                            </label>

                            <select
                                className="w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                                value={filters.paymentMethod}
                                onChange={(e) =>
                                    setfilters(prev => ({
                                        ...prev,
                                        paymentMethod: e.target.value,
                                        page: 0
                                    }))
                                }
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

                        {/* Start Date */}
                        <div>

                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) =>
                                    setfilters(prev => ({
                                        ...prev,
                                        startDate: e.target.value,
                                        page: 0
                                    }))
                                }
                                className="w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                            />

                        </div>

                        {/* End Date */}
                        <div>

                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-2">
                                End Date
                            </label>

                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) =>
                                    setfilters(prev => ({
                                        ...prev,
                                        endDate: e.target.value,
                                        page: 0
                                    }))
                                }
                                className="w-full rounded-lg text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                            />

                        </div>

                    </div>

                </div>
            )}

            {/* Income Table */}
            {incomes.length === 0 && !loading ? (

                <div className="text-center py-16 px-4">

                    <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                        No incomes found.
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Try changing your filters or add a new income.
                    </p>

                </div>

            ) : (

                <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 overflow-hidden">

                    {/* Responsive Table */}
                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-225 bg-white dark:bg-gray-950">

                            {/* Table Header */}
                            <thead className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Title
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Category
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Amount
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Date
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Payment
                                    </th>

                                    <th className="text-left px-6 py-4">
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

                                    incomes.map((income) => (

                                        <tr
                                            key={income.id}
                                            className="text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-950 border-t border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 last:border-b"
                                        >

                                            {/* Title */}
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                {income.title}
                                            </td>

                                            {/* Category */}
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                {income.category}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-4  sm:px-6  py-4  whitespace-nowrap text-green-500 font-semibold">

                                                ₹
                                                {Number(
                                                    income.amount
                                                ).toLocaleString("en-IN")}

                                            </td>


                                            {/* Date */}
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    income.incomeDate
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </td>

                                            {/* Payment */}
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                {income.paymentMethod}
                                            </td>


                                            {/* Actions */}
                                            <td className="px-4 sm:px-6 py-4">

                                                <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap ">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/incomes/${income.id}`
                                                            )
                                                        }
                                                    >
                                                        <Eye size={24} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/incomes/edit/${income.id}`
                                                            )
                                                        }
                                                    >
                                                        <Pencil size={24} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedIncomeId(income.id);
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
                        <div className="flex items-center justify-center gap-3 mt-5 mb-5 px-4">

                            <button
                                disabled={filters.page === 0}
                                onClick={() =>
                                    setfilters(prev => ({
                                        ...prev,
                                        page: prev.page - 1
                                    }))
                                }
                                className="sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                                Previous
                            </button>


                            <span
                                className="text-gray-900 dark:text-gray-400 font-semibold text-sm sm:text-base text-nowrap"
                            >
                                Page {filters.page + 1} of {totalPages}
                            </span>


                            <button
                                disabled={
                                    filters.page === totalPages - 1
                                }
                                onClick={() =>
                                    setfilters(prev => ({
                                        ...prev,
                                        page: prev.page + 1
                                    }))
                                }
                                className="sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto                   "
                            >
                                Next
                            </button>

                        </div>

                    )}

                    {/* Delete Modal */}
                    <ConfirmModal
                        isOpen={showDeleteModal}
                        title="Delete Income"
                        message="Are you sure you want to delete this income? This action cannot be undone."
                        onConfirm={handleDelete}
                        onCancel={() => {
                            setShowDeleteModal(false);
                            setSelectedIncomeId(null);
                        }}
                        loading={deleting}
                        buttonText='Delete Income'
                        onLoadingButtonText='Deleting Income...'
                    />

                </div>

            )}

        </div>
    )
}

export default IncomeList;