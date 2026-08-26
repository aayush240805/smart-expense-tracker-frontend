
const SummaryCard = ({ title, value, valueColor, icon, iconBgColor }) => {

    return (

        <div className={`bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-300`}>

            <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                        {title}
                    </p>

                    <h2 className={`mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-3xl font-bold ${valueColor} truncate`}>
                        {value}
                    </h2>

                </div>


                <div className={`shrink-0 h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full flex items-center justify-center ${iconBgColor}`}>
                    {icon}
                </div>

            </div>

        </div>
    );

};

export default SummaryCard;