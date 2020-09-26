// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// local
import Backdrop from '_/components/Backdrop'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '90vw',
    width: theme.spacing(50),
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
  content: {
    padding: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
  },
  actions: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  controls: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  backDrop: {
    zIndex: 10,
  },
  circularProgress: {
    marginLeft: theme.spacing(1),
  },
}))

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

const Modal: React.FC<IProps> = ({
  isOpen,
  title,
  children,
  onCancel,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  disableConfirm,
  isLoading,
}) => {
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
            <Paper className={cls.container}>
              <Grid container direction="column">
                {title && (
                  <header className={cls.header}>
                    <Typography align="center" variant="body2">
                      {title}
                    </Typography>
                  </header>
                )}
                <section className={cls.content}>{children}</section>
                <section className={cls.actions}>
                  <Grid container justify="flex-end" alignItems="center">
                    {onCancel && (
                      <Button onClick={onCancel} className={cls.controls}>
                        Cancel
                      </Button>
                    )}
                    {onConfirm && (
                      <Button
                        onClick={onConfirm}
                        className={cls.controls}
                        disabled={disableConfirm}
                      >
                        {confirmLabel}
                        {isLoading && (
                          <CircularProgress
                            size={15}
                            className={cls.circularProgress}
                          />
                        )}
                      </Button>
                    )}
                  </Grid>
                </section>
              </Grid>
            </Paper>
          </ClickAwayListener>
        </>
      ) : null}
    </>
  )
}

export default Modal
