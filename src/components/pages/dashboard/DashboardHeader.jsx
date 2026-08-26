import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider';

const DashboardHeader = () => {

    const { user } = useContext(AuthContext);

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex items-center justify-between px-4 sm:px-8 py-6 sm:py-12 gap-16">

            <div>

                <h1 className="text-xl sm:text-4xl font-bold text-black dark:text-white">
                    👋 {greeting}, {user?.fullName}
                </h1>

                <p className='text-sm sm:text-xl text-gray-800 dark:text-gray-300 mt-1'>
                    Welcome back! Here's your financial overview for this month.
                </p>

            </div>

            <div className='text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-2xl'>

                {currentMonth}

            </div>

        </div>
    )
}

export default DashboardHeader;