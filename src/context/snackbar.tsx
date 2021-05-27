// deps
import React, { useState, createContext } from 'react'
// model
import { ISnackbarContext, ISnackbar } from '_/model/context/snackbar'

const snackbarInitState: ISnackbar = {
  open: false,
  type: 'success',
  message: '',
}

const SnackbarContext = createContext<ISnackbarContext>({
  snackbarState: snackbarInitState,
  setSnackbarState: () => {},
})

const SnackbarContextContainer: React.FC = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState(snackbarInitState)

  const handleChange = (props: Partial<ISnackbar>) => {
    setSnackbarState((state: ISnackbar) => ({
      ...state,
      ...props,
    }))
  }

  const contextValue = {
    snackbarState,
    setSnackbarState: handleChange,
  }

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  )
}

export { SnackbarContextContainer as default, SnackbarContext }
