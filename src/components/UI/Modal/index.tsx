import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grid from '@material-ui/core/Grid'
import React, { FC, useState, useEffect } from 'react'

import Backdrop from 'components/UI/Backdrop'

import useStyles from './style'

interface IModalProps {
  isOpen?: boolean
  onClose?: () => void
  disableClickAway: boolean
}

const Modal: FC<IModalProps> = ({
  isOpen,
  children,
  onClose,
  disableClickAway,
}) => {
  const [openState, setOpenState] = useState(isOpen)
  const cls = useStyles()
  const handleClose = (): void => {
    if (!disableClickAway) {
      setOpenState(false)
      if (onClose) {
        onClose()
      }
    }
  }

  useEffect(() => {
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
