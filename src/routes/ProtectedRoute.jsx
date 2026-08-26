import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);  

  // Wait until authentication is restored
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">

          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>

          <p className="text-gray-500">
            Loading...
          </p>

        </div>
      </div>
    );
  }

  // Authentication check is complete
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (<Outlet />);
};

export default ProtectedRoute;