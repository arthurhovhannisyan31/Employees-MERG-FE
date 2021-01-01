// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
// components
import Backdrop from '_/components/UI/Backdrop'
// helpers
import useStyles from './style'

interface IProps {
  isOpen?: boolean
  title?: string
  onCancel?: () => void
  onClose?: () => void
  onConfirm?: () => void
  confirmLabel?: string
  disableConfirm?: boolean
  isLoading?: boolean
}

const Modal: React.FC<IProps> = ({ isOpen, children, onClose }) => {
  const [openState, setOpenState] = React.useState(isOpen)
  const cls = useStyles()
  const handleClose = () => {
    setOpenState(false)
    if (onClose) {
      onClose()
    }
  }

  React.useEffect(() => {
    setOpenState(isOpen)
  }, [isOpen])

  return (
    <>
      {openState ? (
        <>
          <Backdrop />
          <ClickAwayListener onClickAway={handleClose}>
            <Grid container className={cls.container}>
              {children}
            </Grid>
          </ClickAwayListener>
        </>
      ) : null}
    </>
  )
}

export default Modal
