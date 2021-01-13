// deps
import React, { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
// model
import { ISnackbarContext } from '_/model/context/snackbar'
// helpers
import { SnackbarContext } from '_/context'

const SnackbarComp: React.FC = () => {
  const {
    snackbarState: { message, open, type },
    setSnackbarState,
  } = useContext<ISnackbarContext>(SnackbarContext)

  const handleClose = () => {
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
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComp
