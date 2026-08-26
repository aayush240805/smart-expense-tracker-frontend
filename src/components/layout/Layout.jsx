import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-fit sm:w-full flex flex-col">

            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex">

                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <main
                    className="flex-1 min-h-screen w-screen p-3 sm:p-4 lg:p-6 sm:border
                    bg-violet-200 dark:bg-[#0f0f0f]
                    sm:border-black sm:dark:border-gray-700"
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default Layout;