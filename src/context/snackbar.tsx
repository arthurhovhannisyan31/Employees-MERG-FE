// deps
import React, { useState, createContext } from 'react'
// model
import { SnackbarContextProps, SnackbarProps } from 'model/context/snackbar'

const snackbarInitState: SnackbarProps = {
  open: false,
  type: 'success',
  message: '',
}

const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarState: snackbarInitState,
  setSnackbarState: () => null,
})

const SnackbarContextContainer: FC = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState(snackbarInitState)

  const handleChange = (props: Partial<SnackbarProps>): void => {
    setSnackbarState((state: SnackbarProps) => ({
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
