// deps
import React, { useState, createContext } from 'react'
// model
import { ThemeContextProps } from '_/model/context/theme'

const themeInitState = {
  darkMode: true,
  toggleTheme: () => null,
}

const ThemeContext = createContext<ThemeContextProps>(themeInitState)

const ThemeContextContainer: FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = (): void => setDarkMode((val: boolean) => !val)

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContextContainer as default, ThemeContext }
