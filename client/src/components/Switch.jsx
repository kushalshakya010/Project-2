import React, { useState } from "react";
import useStores from "../store";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStores();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");


  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`switch ${isDarkMode ? "light" : "dark"}`}
      onClick={toggleTheme}
    >
      <div className={`ball ${isDarkMode ? "dark" : "light"}`}></div>
    </div>
  );
};

export default ThemeSwitch;