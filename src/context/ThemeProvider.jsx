import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

  const [darkMode, setdarkMode] = useState(() => {

    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark";

  });

  useEffect(() => {

    const root = document.documentElement;
    
    if (darkMode) {

      root.classList.add("dark");
      localStorage.setItem("theme", "dark");

    } else {

      root.classList.remove("dark");
      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);

  const toggleTheme = () => {

    setdarkMode(prev => !prev);

  }
  
  
  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;