import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const TransactionTable = ({ transactions }) => {

    return (
        <div>

            {transactions?.length > 0 ? (

                transactions.map(
                    (transaction, index) => (

                        <div 
                            key={index} 
                            className="flex items-center justify-between gap-3 py-3 sm:py-4 border-b border-gray-500 last:border-b-0"
                        >

                            {/* Left */}
                            <div className="flex items-center gap-2 sm:gap-4 min-w-0">

                                {/* Icon */}
                                <div className="shrink-0">

                                    {transaction.transactionType ===
                                        "INCOME" ? (

                                        <ArrowUpCircle
                                            size={32}
                                            className="text-green-500 sm:w-10 sm:h-10"
                                        />

                                    ) : (

                                        <ArrowDownCircle
                                            size={32}
                                            className="text-red-500 sm:w-10 sm:h-10"
                                        />

                                    )}

                                </div>


                                {/* Title */}
                                <div className="min-w-0">

                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-xs sm:text-base truncate">
                                        {transaction.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {transaction.category}
                                    </p>

                                </div>

                            </div>


                            {/* Right */}
                            <div className="text-right shrink-0">

                                <h3
                                    className={`font-semibold text-sm sm:text-xl
                                    ${transaction.transactionType ===
                                        "INCOME"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }
                                `}
                                >

                                    {transaction.transactionType ===
                                        "INCOME"
                                        ? "+"
                                        : "-"}

                                    ₹
                                    {Number(
                                        transaction.amount
                                    ).toLocaleString("en-IN")}

                                </h3>


                                <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">

                                    {new Date(
                                        transaction.transactionDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}

                                </p>

                            </div>

                        </div>

                    )
                )

            ) : (

                <div className="text-center py-8 sm:py-10 text-gray-500 text-sm">
                    No recent transactions found.
                </div>

            )}

        </div>
    )
}

export default TransactionTable;