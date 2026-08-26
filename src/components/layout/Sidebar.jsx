import { ChartColumn, LayoutDashboard, PiggyBank, Receipt, User, Wallet } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const { user } = useContext(AuthContext);

  const handleNavigation = () => {

    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      path: "/expenses",
      label: "Expenses",
      icon: Receipt
    },
    {
      path: "/incomes",
      label: "Incomes",
      icon: Wallet
    },
    {
      path: "/budgets",
      label: "Budgets",
      icon: PiggyBank
    },
    {
      path: "/reports",
      label: "Reports",
      icon: ChartColumn
    },
    {
      path: "/profile",
      label: "Profile",
      icon: User
    }
  ];


  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      <aside
        className={`fixed md:sticky top-16 left-0 z-50 md:z-40 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] shadow-md transition-all duration-300 overflow-x-auto
          bg-white dark:bg-[#0d031b]
          ${isSidebarOpen
            ? "w-64 translate-x-0 scroll-auto"
            : "w-0 -translate-x-full md:w-16 md:translate-x-0"
          }
        `}
      >

        <nav className="p-2 flex flex-col h-full">

          {/* Navigation */}
          <div className="flex flex-col gap-1">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg h-11 p-3 transition-all duration-200

                    ${isActive
                      ? "bg-violet-700 text-white shadow-md"
                      : "text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
                    }

                    ${isSidebarOpen
                      ? "justify-start"
                      : "justify-center"
                    }
                    `
                  }
                >

                  <div className="flex items-center gap-3">

                    <Icon size={22} />

                    {isSidebarOpen && (
                      <span className="whitespace-nowrap">
                        {item.label}
                      </span>
                    )}

                  </div>

                </NavLink>
              );
            })}

          </div>


          {/* User Section */}
          <div className="mt-3 border-t border-black dark:border-white pt-6 pb-3">

            <div
              className={`
                flex
                items-center
                ${isSidebarOpen
                  ? "flex-col"
                  : "justify-center"
                }
              `}
            >

              {/* Avatar */}
              <div
                className="h-10 w-10 shrink-0 bg-violet-700 rounded-full text-white text-xl font-semibold flex items-center justify-center"
                onClick={() => {
                  window.location.href = "https://myaccount.google.com/"
                }}
              >

                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={user?.fullName?.charAt(0)?.toUpperCase()}
                    className="rounded-full"
                  />
                ) : (
                  <div>
                    {user?.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                )}

              </div>


              {/* User information */}
              {isSidebarOpen && (

                <div className="text-center mt-2 px-2 w-full">

                  <p className="font-semibold text-sm text-black dark:text-white truncate">
                    {user?.fullName}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>

                </div>

              )}

            </div>

          </div>

        </nav>

      </aside>

    </>
  );
};

export default Sidebar;