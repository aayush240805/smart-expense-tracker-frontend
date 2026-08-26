import { Menu, Moon, Sun, X } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="sticky top-0 h-14 sm:h-16 flex items-center justify-between z-50 
        bg-white dark:bg-[#0d031b]
        border dark:border-b-gray-500 sm:border-none
        ">

            {/* Menu Button */}
            <div className="h-full w-14 sm:w-16 p-3 sm:p-5">

                <button
                    title="Menu"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="rounded-lg p-1 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {isSidebarOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

            </div>


            {/* Logo */}
            <div className=" h-full px-3 flex items-center">

                <h1 className="bg-linear-to-r from-violet-600 to-pink-700 bg-clip-text text-transparent text-2xl sm:text-2xl lg:text-4xl font-extrabold truncate">
                    Smart Expense Tracker
                </h1>

            </div>

            {/* Theme Button */}
            <div className="h-full w-14 sm:w-16 p-3 sm:p-4">

                <button
                    onClick={toggleTheme}
                    className="rounded-lg p-1 border border-gray-300 dark:border-gray-500 text-black dark:text-white bg-gray-200 dark:bg-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600 transition" 
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

            </div>

        </header>
    );
};

export default Navbar;