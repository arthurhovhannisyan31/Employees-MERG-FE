// deps
import React, { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
// local
import { SnackbarContext, ISnackbarContext } from '_/context'

const SnackbarComp: React.FC = () => {
  const {
    snackbarState: { message, open, type },
    setSnackbarState,
  } = useContext<ISnackbarContext>(SnackbarContext)

  const handleClose = (_: any) => {
    setSnackbarState({
      open: false,
    })
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
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComp
