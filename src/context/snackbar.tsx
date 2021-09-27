import React, { createContext, useState, FC } from 'react'

import { ISnackbarContext, ISnackbar } from 'model/context/snackbar'

const snackbarInitState: ISnackbar = {
  open: false,
  type: 'success',
  message: '',
}

const SnackbarContext = createContext<ISnackbarContext>({
  snackbarState: snackbarInitState,
  setSnackbarState: () => null,
})

const SnackbarContextContainer: FC = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState(snackbarInitState)

  const handleChange = (props: Partial<ISnackbar>): void => {
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
