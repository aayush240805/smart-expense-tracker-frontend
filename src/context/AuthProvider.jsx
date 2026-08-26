import { createContext, useEffect, useState } from "react";
import { isTokenExpired } from "../services/tokenValidate";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [token, settoken] = useState(null);

  const [authLoading, setauthLoading] = useState(true);

  // Restore authentication after page refresh
  useEffect(() => {
    try {

      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {

        if (isTokenExpired(storedToken)) {

          // Token expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          settoken(null);
          setuser(null);
          
        } else {
          
          // Token valid
          settoken(storedToken);
          setuser(JSON.parse(storedUser));

        }
        
      }

    } catch (error) {

      console.error("Failed to restore authentication:", error);
      
    } finally {

      // Authentication check is complete
      setauthLoading(false);

    }
  }, []);
  

  // Login
  const login = (loginResponse) => {
    
    const token = loginResponse.token;  

    const user = {
      id: loginResponse.id,
      fullName: loginResponse.fullName,
      email: loginResponse.email,
      profilePicture: loginResponse.profilePicture,
      role: loginResponse.role
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    settoken(token);
    setuser(user);

  };


  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // To update UI (rerender)
    settoken(null);
    setuser(null);
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        authLoading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;