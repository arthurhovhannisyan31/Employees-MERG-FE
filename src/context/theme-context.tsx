// deps
import React from 'react'
// local

interface IThemeContext {
  darkMode: boolean
  toggleTheme: () => void
}

const themeInitState = {
  darkMode: true,
  toggleTheme: () => {},
}

const ThemeContext = React.createContext<IThemeContext>(themeInitState)

const ThemeContextContainer: React.FC = ({ children }) => {
  // useState
  const [darkMode, setDarkMode] = React.useState(true)

  const toggleTheme = () => setDarkMode((val: boolean) => !val)

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContextContainer as default, ThemeContext }
