import  { createContext, useContext, useState, useEffect} from "react";


const ThemeContext = createContext(null);
export function ThemeProvider ({ children}) {
  const [theme, setTheme] = useState("light");

   const toggleTheme = () => 
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

   useEffect(() => {
    document.body.className = theme;
   }, [theme]);

   return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme  () {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
