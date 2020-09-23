// deps
import React from 'react'
// local

const CommonContext = React.createContext({})

const CommonContextContainer: React.FC = ({ children }) => {
  return <CommonContext.Provider value={{}}>{children}</CommonContext.Provider>
}

export { CommonContextContainer as default, CommonContext }
