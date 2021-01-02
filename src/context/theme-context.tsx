// deps
import React from 'react'
// model
import {
  IThemeContext,
} from '_/model/context/theme'

const themeInitState = {
  darkMode: true,
  toggleTheme: () => {},
}

const ThemeContext = React.createContext<IThemeContext>(themeInitState)

const ThemeContextContainer: React.FC = ({ children }) => {
  // state
  const [darkMode, setDarkMode] = React.useState(true)

  const toggleTheme = () => setDarkMode((val: boolean) => !val)

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export {
  ThemeContextContainer as default, ThemeContext,
}
