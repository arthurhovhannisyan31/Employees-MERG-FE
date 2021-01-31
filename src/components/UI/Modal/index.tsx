// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
// components
import Backdrop from '_/components/UI/Backdrop'
// helpers
import useStyles from './style'

interface IModalProps {
  isOpen?: boolean
  onClose?: () => void
  disableClickAway: boolean
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  children,
  onClose,
  disableClickAway,
}) => {
  const [openState, setOpenState] = React.useState(isOpen)
  const cls = useStyles()
  const handleClose = () => {
    if (!disableClickAway) {
      setOpenState(false)
      if (onClose) {
        onClose()
      }
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
            <Grid className={cls.container}>{children}</Grid>
          </ClickAwayListener>
        </>
      ) : null}
    </>
  )
}

export default Modal
