// deps
import React from 'react'

const CommonContext = React.createContext({})

const CommonContextContainer: React.FC = ({ children }) => (
  <CommonContext.Provider value={{}}>{children}</CommonContext.Provider>
)

export { CommonContextContainer as default, CommonContext }
