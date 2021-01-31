// deps
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
// helpers
import useStyles from './style'

interface IDialogProps {
  title?: string
  onConfirm?: () => void
  confirmLabel?: string
  onCancel?: () => void
  cancelLabel?: string
  disableConfirm?: boolean
  isLoading?: boolean
}

const Dialog: React.FC<IDialogProps> = ({
  onConfirm,
  confirmLabel = 'Confirm',
  onCancel,
  cancelLabel = 'Cancel',
  title,
  children,
  disableConfirm,
  isLoading,
}) => {
  const cls = useStyles()

  return (
    <Grid container className={cls.container}>
      <Paper className={cls.paper}>
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
              {onCancel && cancelLabel && (
                <Button onClick={onCancel} className={cls.controls}>
                  {cancelLabel}
                </Button>
              )}
              {onConfirm && confirmLabel && (
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
    </Grid>
  )
}

export default Dialog
