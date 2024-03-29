import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import React, { useContext, FC } from 'react'

import { SnackbarContext } from 'context'

import { SnackbarContextProps } from 'model/context/snackbar'

const SnackbarComp: FC = () => {
  const {
    snackbarState: { message, open, type },
    setSnackbarState,
  } = useContext<SnackbarContextProps>(SnackbarContext)

  const handleClose = (): void => {
    setSnackbarState({ open: false })
  }
  // todo notistack

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComp
