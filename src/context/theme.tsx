// deps
import React, { useState } from 'react'
// model
import { IThemeContext } from '_/model/context/theme'

const themeInitState = {
  darkMode: true,
  toggleTheme: () => {},
}

const ThemeContext = React.createContext<IThemeContext>(themeInitState)

const ThemeContextContainer: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => setDarkMode((val: boolean) => !val)

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContextContainer as default, ThemeContext }
