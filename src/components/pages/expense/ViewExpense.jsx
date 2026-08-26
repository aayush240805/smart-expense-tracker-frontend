import { Calendar, CreditCard, FileText, Tag } from 'lucide-react';

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getExpenseById } from '../../../services/expenseService';
import PageHeader from '../../reuseable components/PageHeader';
import ErrorSuccessBox from '../../reuseable components/ErrorSuccessBox';

const ViewExpense = () => {

    const { id } = useParams();

    const [expense, setexpense] = useState(null);

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");

    // Fetch Expense
    const fetchExpense = async () => {

        try {

            setloading(true);

            seterror("");

            const data = await getExpenseById(id);

            setexpense(data);

        } catch (error) {

            console.error("Failed to fetch expense:", error);

            seterror(
                error.response?.data?.message ||
                "Failed to load expense."
            );

        } finally {

            setloading(false);

        }

    };

    useEffect(() => {

        fetchExpense();

    }, [id]);


    // Loading
    if (loading) {
        return (
            <div className="p-4 sm:p-6">
                <p className="text-gray-500 dark:text-gray-200">
                    Loading expense...
                </p>
            </div>
        );
    }

    // Error
    <ErrorSuccessBox error={error} />

    // Not found
    if (!expense) {
        return (
            <div className="p-4 sm:p-6">
                <p className="text-gray-500 dark:text-gray-200">
                    Expense not found.
                </p>
            </div>
        );
    }


    return (

        <div className="w-full p-4 sm:p-6">

            {/* Header */}
            <PageHeader
                title={"Expense Details"}
                subtitle={"View complete information about this expense."}
                showBackButton={true}
            />

            {/* Expense Card */}
            <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-5 sm:p-6 w-full max-w-3xl">

                {/* Title */}
                <div className="mb-6">

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Title
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-1 wrap-break-word">
                        {expense.title}
                    </h2>

                </div>


                {/* Amount */}
                <div className="mb-6">

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Amount
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold text-red-500 mt-1">
                        ₹{Number(
                            expense.amount
                        ).toLocaleString("en-IN")}
                    </p>

                </div>


                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                    {/* Category */}
                    <div className="flex items-start gap-3 min-w-0">

                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">

                            <Tag
                                size={20}
                                className="text-blue-600"
                            />

                        </div>

                        <div className="min-w-0">

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Category
                            </p>

                            <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                                {expense.category}
                            </p>

                        </div>

                    </div>


                    {/* Payment */}
                    <div className="flex items-start gap-3 min-w-0">

                        <div className="p-2 bg-purple-100 rounded-lg shrink-0">

                            <CreditCard
                                size={20}
                                className="text-purple-600"
                            />

                        </div>

                        <div className="min-w-0">

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Payment Method
                            </p>

                            <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                                {expense.paymentMethod}
                            </p>

                        </div>

                    </div>


                    {/* Date */}
                    <div className="flex items-start gap-3 min-w-0">

                        <div className="p-2 bg-green-100 rounded-lg shrink-0">

                            <Calendar
                                size={20}
                                className="text-green-600"
                            />

                        </div>

                        <div className="min-w-0">

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Expense Date
                            </p>

                            <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                                {expense.expenseDate}
                            </p>

                        </div>

                    </div>


                    {/* Description */}
                    <div className="flex items-start gap-3 min-w-0">

                        <div className="p-2 bg-yellow-100 rounded-lg shrink-0">

                            <FileText
                                size={20}
                                className="text-yellow-600"
                            />

                        </div>

                        <div className="min-w-0">

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Description
                            </p>

                            <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                                {expense.description || "No description"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Dates */}

                <div className="border-t mt-8 pt-5 text-sm text-gray-600 dark:text-gray-200 wrap-break-word">

                    <p>
                        Created:{" "}
                        {expense.createdAt
                            ? new Date(
                                expense.createdAt
                            ).toLocaleString()
                            : "N/A"}
                    </p>

                    <p className="mt-2">

                        Last updated:{" "}

                        {expense.updatedAt
                            ? new Date(
                                expense.updatedAt
                            ).toLocaleString()
                            : "N/A"}

                    </p>

                </div>

            </div>

        </div>
    )
}

export default ViewExpense;